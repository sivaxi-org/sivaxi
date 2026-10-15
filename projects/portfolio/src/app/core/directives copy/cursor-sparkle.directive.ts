import {
  Directive, ElementRef, AfterViewInit, OnDestroy, NgZone, Input
} from '@angular/core';

@Directive({
  selector: '[cursorSparkle]',
  standalone: true,
})
export class CursorSparkleDirective implements AfterViewInit, OnDestroy {
  /** how many sparkles spawn per mousemove event */
  @Input() density = 1;

  /** hex/hsl colors to randomly pick from for each sparkle */
  @Input() colors = ['#7c5cff', '#34d9c9', '#f5f5f7'];

  /** disable on touch devices by default (no real cursor) */
  @Input() enableOnTouch = false;

  /** 0..1, higher = cursor icon follows mouse more tightly, lower = more trailing lag */
  @Input() cursorFollow = 0.25;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private sparkles: any[] = [];
  private rafId = 0;
  private lastMove = 0;
  private throttleMs = 16; // ~60fps spawn cap
  private active = false;

  // custom cursor state
  private cursorEl!: HTMLElement;
  private cx = 0;
  private cy = 0;
  private cxSmooth = 0;
  private cySmooth = 0;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch && !this.enableOnTouch) return;

    this.active = true;
    this.setupCanvas();
    this.setupCustomCursor();

    this.zone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      window.addEventListener('resize', this.resizeCanvas);
      this.loop();
    });
  }

  private setupCanvas(): void {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.inset = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private resizeCanvas = (): void => {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  };

  private setupCustomCursor(): void {
    document.body.style.cursor = 'none';

    this.cursorEl = document.createElement('div');
    this.cursorEl.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
          fill="#f5f5f7" />
      </svg>
    `;
    this.cursorEl.style.position = 'fixed';
    this.cursorEl.style.top = '0';
    this.cursorEl.style.left = '0';
    this.cursorEl.style.pointerEvents = 'none';
    this.cursorEl.style.zIndex = '10000';
    this.cursorEl.style.willChange = 'transform';
    document.body.appendChild(this.cursorEl);
  }

  private updateCustomCursor(): void {
    this.cxSmooth += (this.cx - this.cxSmooth) * this.cursorFollow;
    this.cySmooth += (this.cy - this.cySmooth) * this.cursorFollow;
    const rotation = (performance.now() / 20) % 360;
    this.cursorEl.style.transform =
      `translate(${this.cxSmooth}px, ${this.cySmooth}px) translate(-50%, -50%) rotate(${rotation}deg)`;
  }

  private onMouseMove = (e: MouseEvent): void => {
    this.cx = e.clientX;
    this.cy = e.clientY;

    const now = performance.now();
    if (now - this.lastMove < this.throttleMs) return;
    this.lastMove = now;

    for (let i = 0; i < this.density; i++) {
      this.spawnSparkle(e.clientX, e.clientY);
    }
  };

  private spawnSparkle(x: number, y: number): void {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.3 + Math.random() * 0.6;

    this.sparkles.push({
      x,
      y,
      life: 1,
      maxLife: 0.6 + Math.random() * 0.4,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.2,
      vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 0.2,
      size: 2 + Math.random() * 3,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
    });

    // cap total particles to avoid runaway memory/perf on fast mice
    if (this.sparkles.length > 200) {
      this.sparkles.splice(0, this.sparkles.length - 200);
    }
  }

  private drawStar(cx: number, cy: number, size: number, rotation: number, alpha: number, color: string): void {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = size * 2;

    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.25, -size * 0.25);
    ctx.lineTo(size, 0);
    ctx.lineTo(size * 0.25, size * 0.25);
    ctx.lineTo(0, size);
    ctx.lineTo(-size * 0.25, size * 0.25);
    ctx.lineTo(-size, 0);
    ctx.lineTo(-size * 0.25, -size * 0.25);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  private loop = (): void => {
    if (!this.active) return;

    this.updateCustomCursor();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const s = this.sparkles[i];
      s.life -= (1 / 60) / s.maxLife;

      if (s.life <= 0) {
        this.sparkles.splice(i, 1);
        continue;
      }

      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.01; // slight gravity drift
      s.rotation += s.rotSpeed;

      const alpha = Math.max(0, s.life);
      const size = s.size * (0.5 + s.life * 0.5);

      this.drawStar(s.x, s.y, size, s.rotation, alpha, s.color);
    }

    this.rafId = requestAnimationFrame(this.loop);
  };

  ngOnDestroy(): void {
    this.active = false;
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.resizeCanvas);
    this.canvas?.remove();
    this.cursorEl?.remove();
    document.body.style.cursor = '';
  }
}
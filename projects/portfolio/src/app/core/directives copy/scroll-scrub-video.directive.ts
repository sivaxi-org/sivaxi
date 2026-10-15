import {
  Directive, ElementRef, Input, OnDestroy, AfterViewInit, OnChanges,
  SimpleChanges, NgZone
} from '@angular/core';

export type VideoPlayMode = 'scroll' | 'static';

@Directive({
  selector: 'video[scrollScrub]',
  standalone: true,
})
export class ScrollScrubVideoDirective implements AfterViewInit, OnChanges, OnDestroy {
  /** 'scroll' = ping-pong scrub tied to scroll position. 'static' = normal autoplay loop. */
  @Input() mode: VideoPlayMode = 'scroll';

  /** how many forward+back cycles happen across the tracked scroll range (scroll mode only) */
  @Input() cycles = 1;

  /** 0..1, higher = snappier, lower = smoother/laggier follow (scroll mode only) */
  @Input() smoothing = 0.12;

  /** optional: track a specific element's scroll range instead of the whole page (scroll mode only) */
  @Input() scrubContainer?: HTMLElement;

  private video: HTMLVideoElement;
  private rafId = 0;
  private targetProgress = 0;
  private currentTime = 0;
  private duration = 0;
  private ready = false;
  private listenersAttached = false;
  private viewInited = false;

  constructor(private el: ElementRef<HTMLVideoElement>, private zone: NgZone) {
    this.video = this.el.nativeElement;
  }

  ngAfterViewInit(): void {
    this.video.muted = true;
    this.video.playsInline = true;

    const onMeta = () => {
      this.duration = this.video.duration || 0;
      this.ready = true;
    };
    this.video.addEventListener('loadedmetadata', onMeta);
    if (this.video.readyState >= 1) onMeta();

    this.viewInited = true;
    this.applyMode();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // mode can change at runtime (e.g. user toggles a button)
    if (changes['mode'] && this.viewInited) {
      this.applyMode();
    }
  }

  private applyMode(): void {
    if (this.mode === 'static') {
      this.enterStaticMode();
    } else {
      this.enterScrollMode();
    }
  }

  private enterStaticMode(): void {
    this.detachScrollListeners();
    cancelAnimationFrame(this.rafId);

    this.video.loop = true;
    this.video.play().catch(() => {
      // autoplay can be blocked before user interaction; safe to ignore
    });
  }

  private enterScrollMode(): void {
    this.video.loop = false;
    this.video.pause(); // we drive it manually now

    this.attachScrollListeners();

    this.zone.runOutsideAngular(() => {
      this.onScroll();
      this.loop();
    });
  }

  private attachScrollListeners(): void {
    if (this.listenersAttached) return;
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
    });
    this.listenersAttached = true;
  }

  private detachScrollListeners(): void {
    if (!this.listenersAttached) return;
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    this.listenersAttached = false;
  }

  private onScroll = () => {
    const el = this.scrubContainer;
    let progress: number;

    if (el) {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      progress = total > 0 ? (-rect.top) / total : 0;
    } else {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progress = total > 0 ? window.scrollY / total : 0;
    }

    this.targetProgress = Math.min(1, Math.max(0, progress));
  };

  /** triangle wave: 0->1->0->1... instead of clamping at the ends */
  private pingPong(t: number): number {
    const x = t * this.cycles;
    const period = x % 2;
    return period <= 1 ? period : 2 - period;
  }

  private loop = () => {
    if (this.mode !== 'scroll') return; // stop the RAF chain once switched away

    if (this.ready && this.duration > 0) {
      const targetTime = this.pingPong(this.targetProgress) * this.duration;
      this.currentTime += (targetTime - this.currentTime) * this.smoothing;

      if (Math.abs(this.video.currentTime - this.currentTime) > 0.01) {
        this.video.currentTime = this.currentTime;
      }
    }
    this.rafId = requestAnimationFrame(this.loop);
  };

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    this.detachScrollListeners();
  }
}
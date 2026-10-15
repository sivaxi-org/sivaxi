
import {
  Component,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'lib-draggable-float',
  standalone: true,
  templateUrl: './draggable-float.html',
  styleUrl: './draggable-float.css',
})
export class DraggableFloatComponent implements OnInit {
  position = signal({ x: 0, y: 100 });

  private pointerStart = { x: 0, y: 0 };
  private positionStart = { x: 0, y: 0 };
  private activePointerId: number | null = null;
  private dragging = false;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.position.set({
        x: Math.max(0, window.innerWidth - 76),
        y: 100,
      });
    }
  }

  onPointerDown(event: PointerEvent): void {
    if (!event.isPrimary || event.button !== 0) return;

    this.activePointerId = event.pointerId;
    this.dragging = false;

    this.pointerStart = {
      x: event.clientX,
      y: event.clientY,
    };

    this.positionStart = { ...this.position() };
  }

  @HostListener('window:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (
      this.activePointerId === null ||
      event.pointerId !== this.activePointerId
    ) {
      return;
    }

    const dx = event.clientX - this.pointerStart.x;
    const dy = event.clientY - this.pointerStart.y;

    // A small movement should still count as a normal click.
    if (!this.dragging && Math.hypot(dx, dy) < 6) return;

    this.dragging = true;
    event.preventDefault();

    const elementWidth = 48;
    const elementHeight = 48;

    const x = Math.max(
      0,
      Math.min(
        window.innerWidth - elementWidth,
        this.positionStart.x + dx,
      ),
    );

    const y = Math.max(
      0,
      Math.min(
        window.innerHeight - elementHeight,
        this.positionStart.y + dy,
      ),
    );

    this.position.set({ x, y });
  }

  @HostListener('window:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (event.pointerId !== this.activePointerId) return;

    this.activePointerId = null;
    this.dragging = false;
  }

  @HostListener('window:pointercancel')
  onPointerCancel(): void {
    this.activePointerId = null;
    this.dragging = false;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (typeof window === 'undefined') return;

    this.position.update(({ x, y }) => ({
      x: Math.max(0, Math.min(x, window.innerWidth - 48)),
      y: Math.max(0, Math.min(y, window.innerHeight - 48)),
    }));
  }
}

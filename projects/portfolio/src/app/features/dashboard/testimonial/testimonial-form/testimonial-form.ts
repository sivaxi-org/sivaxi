
import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';

import { TestimonialDto } from '../testimonial-service';

@Component({
  selector: 'app-testimonial-form',
  standalone: true,
  imports: [],
  templateUrl: './testimonial-form.html',
  styleUrl: './testimonial-form.css'
})
export class TestimonialForm {

  testimonial = input<TestimonialDto | null>(null);

  cancelled = output<void>();
  submitted = output<TestimonialDto>();

  authorName = signal('');
  authorRole = signal('');
  authorAvatarUrl = signal('');
  content = signal('');
  featured = signal(false);
  sortOrder = signal(0);
  visible = signal(true);

  constructor() {
    effect(() => {
      const testimonial = this.testimonial();

      if (!testimonial) {
        this.authorName.set('');
        this.authorRole.set('');
        this.authorAvatarUrl.set('');
        this.content.set('');
        this.featured.set(false);
        this.sortOrder.set(0);
        this.visible.set(true);
        return;
      }

      this.authorName.set(testimonial.authorName);
      this.authorRole.set(testimonial.authorRole ?? '');
      this.authorAvatarUrl.set(testimonial.authorAvatarUrl ?? '');
      this.content.set(testimonial.content);
      this.featured.set(testimonial.featured);
      this.sortOrder.set(testimonial.sortOrder);
      this.visible.set(testimonial.visible);
    });
  }

  get editMode(): boolean {
    return this.testimonial() !== null;
  }

  submit(): void {
    const authorName = this.authorName().trim();
    const content = this.content().trim();

    if (!authorName || !content) {
      return;
    }

    this.submitted.emit({
      id: this.testimonial()?.id ?? '',
      authorName,
      authorRole: this.authorRole().trim() || null,
      authorAvatarUrl: this.authorAvatarUrl().trim() || null,
      content,
      featured: this.featured(),
      sortOrder: this.testimonial()?.sortOrder ?? this.sortOrder(),
      visible: this.visible()
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}


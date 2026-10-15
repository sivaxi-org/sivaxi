
import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  TestimonialDto,
  TestimonialService
} from './testimonial-service';

import { TestimonialForm } from './testimonial-form/testimonial-form';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    TestimonialForm
  ],
  templateUrl: './testimonial.html',
  styleUrl: './testimonial.css'
})
export class Testimonials implements OnInit {

  private readonly testimonialService =
    inject(TestimonialService);

  testimonials = signal<TestimonialDto[]>([]);
  loading = signal(false);

  showAddTestimonial = signal(false);
  editingTestimonial =
    signal<TestimonialDto | null>(null);

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials(): void {
    this.loading.set(true);

    this.testimonialService
      .getTestimonials(false, false)
      .subscribe({
        next: testimonials => {
          this.testimonials.set(
            [...testimonials].sort(
              (a, b) => a.sortOrder - b.sortOrder
            )
          );

          this.loading.set(false);
        },

        error: error => {
          console.error(
            'Failed to load testimonials',
            error
          );

          this.loading.set(false);
        }
      });
  }

  openAddTestimonial(): void {
    this.editingTestimonial.set(null);
    this.showAddTestimonial.set(true);
  }

  closeAddTestimonial(): void {
    this.showAddTestimonial.set(false);
  }

  createTestimonial(
    testimonial: TestimonialDto
  ): void {

    const newTestimonial: TestimonialDto = {
      ...testimonial,
      id: '',
      sortOrder: this.testimonials().length
    };

    this.testimonialService
      .createTestimonial(newTestimonial)
      .subscribe({
        next: created => {
          this.testimonials.update(
            testimonials =>
              [...testimonials, created].sort(
                (a, b) =>
                  a.sortOrder - b.sortOrder
              )
          );

          this.showAddTestimonial.set(false);
        },

        error: error => {
          console.error(
            'Failed to create testimonial',
            error
          );
        }
      });
  }

  openEditTestimonial(
    testimonial: TestimonialDto
  ): void {
    this.showAddTestimonial.set(false);
    this.editingTestimonial.set(testimonial);
  }

  closeEditTestimonial(): void {
    this.editingTestimonial.set(null);
  }

  updateTestimonial(
    testimonial: TestimonialDto
  ): void {

    if (!testimonial.id) {
      return;
    }

    this.testimonialService
      .updateTestimonial(
        testimonial.id,
        testimonial
      )
      .subscribe({
        next: updated => {
          this.testimonials.update(
            testimonials =>
              testimonials
                .map(existing =>
                  existing.id === updated.id
                    ? updated
                    : existing
                )
                .sort(
                  (a, b) =>
                    a.sortOrder - b.sortOrder
                )
          );

          this.editingTestimonial.set(null);
        },

        error: error => {
          console.error(
            'Failed to update testimonial',
            error
          );
        }
      });
  }

  deleteTestimonial(
    testimonial: TestimonialDto
  ): void {

    if (!testimonial.id) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${testimonial.authorName}"'s testimonial?`
    );

    if (!confirmed) {
      return;
    }

    this.testimonialService
      .deleteTestimonial(testimonial.id)
      .subscribe({
        next: () => {
          this.testimonials.update(
            testimonials =>
              testimonials.filter(
                existing =>
                  existing.id !== testimonial.id
              )
          );

          const editing =
            this.editingTestimonial();

          if (
            editing?.id === testimonial.id
          ) {
            this.editingTestimonial.set(null);
          }
        },

        error: error => {
          console.error(
            'Failed to delete testimonial',
            error
          );
        }
      });
  }
}


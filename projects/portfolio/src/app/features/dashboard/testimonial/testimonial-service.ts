
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface TestimonialRequest {
  authorName: string;
  authorRole: string | null;
  authorAvatarUrl: string | null;
  content: string;
  featured: boolean;
  sortOrder: number;
  visible: boolean;
}

export interface TestimonialDto extends TestimonialRequest {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  private readonly apiUrl =
    `${environment.apiUrl}/api/testimonials`;

  constructor(
    private readonly http: HttpClient
  ) {}

  getTestimonials(
    visibleOnly = false,
    featuredOnly = false
  ): Observable<TestimonialDto[]> {
    return this.http.get<TestimonialDto[]>(
      `${this.apiUrl}?visibleOnly=${visibleOnly}&featuredOnly=${featuredOnly}`
    );
  }

  getTestimonial(id: string): Observable<TestimonialDto> {
    return this.http.get<TestimonialDto>(
      `${this.apiUrl}/${id}`
    );
  }

  createTestimonial(
    testimonial: TestimonialRequest
  ): Observable<TestimonialDto> {
    return this.http.post<TestimonialDto>(
      this.apiUrl,
      testimonial
    );
  }

  updateTestimonial(
    id: string,
    testimonial: TestimonialRequest
  ): Observable<TestimonialDto> {
    return this.http.put<TestimonialDto>(
      `${this.apiUrl}/${id}`,
      testimonial
    );
  }

  deleteTestimonial(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}


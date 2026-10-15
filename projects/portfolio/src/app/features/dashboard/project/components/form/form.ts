import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';
import { ProjectDto, ProjectRequest } from '../../project-service';



@Component({
  selector: 'app-project-form',
  imports: [],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class ProjectForm {

  project =
    input<ProjectDto | null>(null);

  readonly cancelled =
    output<void>();

  readonly submitted =
    output<ProjectRequest>();

  title =
    signal('');

  slug =
    signal('');

  summary =
    signal('');

  thumbnailUrl =
    signal('');

  liveUrl =
    signal('');

  sourceUrl =
    signal('');

  featured =
    signal(false);

  visible =
    signal(true);

  constructor() {

    effect(() => {

      const current =
        this.project();

      if (!current) {
        return;
      }

      this.title.set(current.title);
      this.slug.set(current.slug);
      this.summary.set(current.summary ?? '');
      this.thumbnailUrl.set(
        current.thumbnailUrl ?? ''
      );
      this.liveUrl.set(
        current.liveUrl ?? ''
      );
      this.sourceUrl.set(
        current.sourceUrl ?? ''
      );
      this.featured.set(current.featured);
      this.visible.set(current.visible);

    });

  }

  updateTitle(value: string): void {
    this.title.set(value);
  }

  updateSlug(value: string): void {
    this.slug.set(value);
  }

  updateSummary(value: string): void {
    this.summary.set(value);
  }

  updateThumbnailUrl(value: string): void {
    this.thumbnailUrl.set(value);
  }

  updateLiveUrl(value: string): void {
    this.liveUrl.set(value);
  }

  updateSourceUrl(value: string): void {
    this.sourceUrl.set(value);
  }

  updateFeatured(value: boolean): void {
    this.featured.set(value);
  }

  updateVisible(value: boolean): void {
    this.visible.set(value);
  }

  cancel(): void {
    this.cancelled.emit();
  }

  submit(): void {

    const request: ProjectRequest = {

      title: this.title().trim(),

      slug: this.slug().trim(),

      summary:
        this.summary().trim() || null,

      thumbnailUrl:
        this.thumbnailUrl().trim() || null,

      liveUrl:
        this.liveUrl().trim() || null,

      sourceUrl:
        this.sourceUrl().trim() || null,

      sortOrder:
        this.project()?.sortOrder ?? 0,

      featured:
        this.featured(),

      visible:
        this.visible()

    };

    this.submitted.emit(request);

  }

}
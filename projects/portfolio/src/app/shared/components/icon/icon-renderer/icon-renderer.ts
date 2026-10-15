import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="containerClasses()"
      [innerHTML]="safeSvg()"
    ></div>
  `
})
export class IconRenderer {

  // Normalized SVG markup - expected to already be sanitized
  // (backend on upload/store, this component does not re-sanitize).
  svg = input.required<string>();

  // Tailwind utility classes, e.g. "h-6 w-6", "text-blue-500 dark:text-blue-400"
  sizeClass = input('h-6 w-6');
  colorClass = input('text-text-primary');

  private sanitizer = inject(DomSanitizer);

  containerClasses = computed(() =>
    [this.sizeClass(), this.colorClass()].filter(Boolean).join(' ')
  );

  safeSvg = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.svg())
  );

}
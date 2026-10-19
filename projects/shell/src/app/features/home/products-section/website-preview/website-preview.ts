import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-website-preview',
  standalone: true,
  templateUrl: './website-preview.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebsitePreview {
  private sanitizer = inject(DomSanitizer);

  src = input.required<string>();
  title = input.required<string>();
  address = input<string>();


  heightClass = input(
    'h-[320px] sm:h-[448px]',
  );

  safeSrc = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.src()),
  );
}
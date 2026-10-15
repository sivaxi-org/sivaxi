
import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  robots?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(metadata: SeoMetadata): void {
    this.title.setTitle(metadata.title);

    this.meta.updateTag({
      name: 'description',
      content: metadata.description,
    });

    this.meta.updateTag({
      name: 'robots',
      content: metadata.robots ?? 'index, follow',
    });

    this.meta.updateTag({
      property: 'og:type',
      content: 'website',
    });

    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Sivaxi',
    });

    this.meta.updateTag({
      property: 'og:title',
      content: metadata.title,
    });

    this.meta.updateTag({
      property: 'og:description',
      content: metadata.description,
    });

    this.meta.updateTag({
      property: 'og:url',
      content: metadata.canonicalUrl,
    });

    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary',
    });

    this.meta.updateTag({
      name: 'twitter:title',
      content: metadata.title,
    });

    this.meta.updateTag({
      name: 'twitter:description',
      content: metadata.description,
    });

    let canonical = this.document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }

    canonical.href = metadata.canonicalUrl;
  }
}

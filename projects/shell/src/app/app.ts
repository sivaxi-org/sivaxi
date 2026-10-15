
import { Component, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { SeoService } from './core/services/seo.service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateSeo());
  }

  private updateSeo(): void {
    const path = this.router.url.split('?')[0].split('#')[0];

    if (path === '/') {
      this.seo.update({
        title: 'Sivaxi — Software Engineering, AI & Technology',
        description:
          'Explore Sivaxi: AI assistants, agentic AI systems, modern web applications, backend services, and developer tools.',
        canonicalUrl: 'https://sivaxi.com/',
      });
      return;
    }

    if (path === '/vixi' || path.startsWith('/vixi/')) {
      this.seo.update({
        title: 'Vixi AI — Intelligent AI Assistant | Sivaxi',
        description:
          'Discover Vixi, an AI assistant built with modern AI technologies and agentic workflows by Sivaxi.',
        canonicalUrl: `https://sivaxi.com${path}`,
        robots: 'noindex, follow',
      });
      return;
    }

    if (path === '/portfolio' || path.startsWith('/portfolio/')) {
      this.seo.update({
        title: 'Developer Portfolio | Sivaxi',
        description:
          'Explore software engineering portfolios, projects, technical skills, and development experience on Sivaxi.',
        canonicalUrl: `https://sivaxi.com${path}`,
      });
    }
  }
}

import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
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

    // Sivaxi — the parent technology brand
    if (path === '/') {
      this.seo.update({
        title: 'Sivaxi | SaaS Products & Custom Software Development',
        description:
          'Sivaxi builds SaaS products and delivers custom software development services for businesses. Explore AI-powered solutions, agentic AI, web applications, backend systems, API integrations, and scalable software engineering.',
        canonicalUrl: 'https://sivaxi.com/',
      });
      return;
    }
    // Vixi — a personalized AI assistant platform
    if (path === '/vixi' || path.startsWith('/vixi/')) {
      const isPrivateArea =
        path.includes('/dashboard') || path.includes('/chat') || path.includes('/settings');

      this.seo.update({
        title: 'Vixi AI | Personal AI Assistant & Agentic AI Platform',
        description:
          'Vixi is an AI assistant platform by Sivaxi, built for personalized conversations, contextual memory, intelligent tools, web search, and agentic workflows. Experience AI designed around your needs.',
        canonicalUrl: `https://sivaxi.com${path}`,
        robots: isPrivateArea ? 'noindex, nofollow' : 'noindex, follow',
      });
      return;
    }

    // Portfolio — a multi-user portfolio publishing platform
    if (path === '/portfolio' || path.startsWith('/portfolio/')) {
      const isPrivateArea =
        path.includes('/dashboard') || path.endsWith('/login') || path.endsWith('/register');

      this.seo.update({
        title: 'Sivaxi Portfolio | Create & Showcase Your Professional Profile',
        description:
          'Build and share your own professional portfolio with Sivaxi Portfolio. Showcase your projects, technical skills, work experience, achievements, and professional identity through a dedicated online profile.',
        canonicalUrl: `https://sivaxi.com${path}`,
        robots: isPrivateArea ? 'noindex, nofollow' : 'index, follow',
      });
    }
  }
}

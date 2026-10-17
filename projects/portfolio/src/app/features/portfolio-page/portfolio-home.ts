import { AfterViewInit, Component, effect, ElementRef, inject, signal, ViewChild } from "@angular/core";

import { PortfolioHomeService, PortfolioHomeResponse } from "./portfolio-home-service";

import { Footer } from "../../shared/components/footer/footer";
import { ActivatedRoute } from "@angular/router";
import { ThemeService } from "shared";
import { ScrollScrubVideoDirective } from "../../core/directives/scroll-scrub-video.directive";
import { Hero } from "./hero/hero";
import { Skills } from "./skills/skills";
import { Work } from "./work/work";
import { Blog } from "./blog/blog";
import { Experience } from "./experience/experience";
import { Testimonials } from "./testimonials/testimonials";
import { About } from "./about/about";
import { Contact } from "./contact/contact";

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-home.html',
  standalone: true,
  imports: [
    ScrollScrubVideoDirective,
    Hero,
    Skills,
    Work,
    Blog,
    Experience,
    Testimonials,
    About,
    Contact,
    Footer,
  ],
})
export class PortfolioPage implements AfterViewInit {

  readonly themeService = inject(ThemeService);
  private readonly route = inject(ActivatedRoute);
  
  private readonly portfolioHomeService = inject(PortfolioHomeService);

  readonly portfolio = signal<PortfolioHomeResponse | undefined>(undefined);

  @ViewChild('backgroundVideo')
  private readonly video?: ElementRef<HTMLVideoElement>;
  username = this.route.snapshot.paramMap.get('username');

  private previousTime = 0;

  constructor() {
    effect(() => {
      const theme = this.themeService.theme();

      queueMicrotask(() => {
        this.switchVideo(theme);
      });
    });

    this.loadPortfolio();
  }

  ngAfterViewInit(): void {
    this.video?.nativeElement.play().catch(() => {});
  }

  get backgroundVideoSrc(): string {
    return this.themeService.theme() === 'dark'
      ? 'assets/videos/bg_video_dark.mp4'
      : 'assets/videos/bg_video_light.mp4';
  }

  private loadPortfolio(): void {
    

    this.portfolioHomeService.getPortfolio(this.username??"").subscribe({
      next: (portfolio) => {
        this.portfolio.set(portfolio);
      },
      error: (error) => {
        console.error('Failed to load portfolio:', error);
      },
    });
  }

  private switchVideo(theme: 'light' | 'dark'): void {
    const video = this.video?.nativeElement;

    if (!video) {
      return;
    }

    const currentTime = video.currentTime;

    this.previousTime = currentTime;

    video.load();

    video.addEventListener(
      'loadedmetadata',
      () => {
        if (this.previousTime > 0) {
          video.currentTime = Math.min(
            this.previousTime,
            video.duration || this.previousTime
          );
        }

        video.play().catch(() => {});
      },
      { once: true }
    );
  }
}
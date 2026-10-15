import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, RouterLink } from '@angular/router';

import { AuthService , ThemeService , SIVAXI_BRANDING, ThemeComponent } from 'shared';

interface NavLink {
  label: string;
  fragment: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  public authService = inject(AuthService);
  public themeService = inject(ThemeService);
  public branding = signal<any>(SIVAXI_BRANDING)

  protected readonly navLinks: NavLink[] = [
    { label: 'Work', fragment: 'work' },
    { label: 'Experience', fragment: 'experience' },
    { label: 'Blog', fragment: 'blog' },
    { label: 'About', fragment: 'about' },
    { label: 'Contact', fragment: 'contact' },
  ];

  // Signal instead of a plain field — this is what makes zoneless CD fire
  // when it's mutated from a @HostListener, a router event, or a timeout.
  protected readonly menuOpen = signal(false);

  constructor() {
    // Close the mobile menu whenever a navigation starts, so it never
    // stays open after clicking Login / Get Started / a section link.
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.closeMenu();
        }
      });

    this.destroyRef.onDestroy(() => this.unlockBodyScroll());
  }

  toggleMenu(): void {
    this.menuOpen() ? this.closeMenu() : this.openMenu();
  }

  openMenu(): void {
    this.menuOpen.set(true);
    this.lockBodyScroll();
  }

  closeMenu(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.unlockBodyScroll();
  }

  /**
   * Scrolls to a section on the home page. A plain `href="#work"` only
   * works while already on `/`; it silently does nothing on `/dashboard`,
   * `/projects/:slug`, `/plans`, etc. This navigates home first when needed,
   * then scrolls once the page has rendered.
   */
   goToSection(fragment: string, event: Event): void {
    event.preventDefault();
    this.closeMenu();

    if (this.router.url === '/' || this.router.url.startsWith('/#')) {
      this.scrollToFragment(fragment);
      return;
    }

    this.router.navigate(['/'], { fragment }).then(() => {
      this.scrollToFragment(fragment);
    });
  }

  private scrollToFragment(fragment: string): void {
    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen()) return;
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  @HostListener('window:resize')
  protected onResize(): void {
    // Tailwind's `md` breakpoint (matches the `md:hidden` on the menu button).
    if (this.menuOpen() && window.innerWidth >= 768) {
      this.closeMenu();
    }
  }

  private lockBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }
}
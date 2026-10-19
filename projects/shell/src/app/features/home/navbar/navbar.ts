import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SIVAXI_BRANDING, ThemeComponent, ThemeService } from 'shared';
import { ButtonDirective } from '../../../core/directives/button-directive/button-directive';

interface NavLink {
  label: string;
  path: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', path: '#top' },
  { label: 'Products', path: '#products' },
  { label: 'Platforms', path: '#platforms' },
  { label: 'Capabilities', path: '#capabilities' },
  { label: 'Technology', path: '#technology' },
  { label: 'About', path: '#about' },
  { label: 'Journal', path: '#journal' },
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ThemeComponent,ButtonDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly themeService = inject(ThemeService);

  readonly links = signal<NavLink[]>(navLinks);
  readonly branding = signal(SIVAXI_BRANDING);
  readonly isMenuOpen = signal(false);
  
  activeSection = signal('');

  toggleMenu(): void {
    this.isMenuOpen.update((state) => !state);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  navigateToSection(event: Event, path: string): void {
    event.preventDefault();

    const id = path.replace(/^#/, '');
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    this.activeSection.set(path);
    this.closeMenu();
  }
}

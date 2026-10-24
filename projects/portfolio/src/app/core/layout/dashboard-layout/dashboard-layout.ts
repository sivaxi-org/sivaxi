import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService, ThemeComponent } from 'shared';

interface NavItem {
  readonly label: string;
  readonly route: string;
  readonly icon: string;
  readonly exact?: boolean;
  readonly external?: boolean;
}

interface NavGroup {
  readonly title: string;
  readonly items: readonly NavItem[];
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, ThemeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  readonly authService = inject(AuthService);

  mobileMenuOpen = false;

  readonly navGroups: readonly NavGroup[] = [
    {
      title: 'General',
      items: [
        {
          label: 'Overview',
          route: `/portfolio/${this.authService.getUsername()}`,
          icon: 'lucide:layout-dashboard',
          exact: true,
          external: true,
        },
      ],
    },
    {
      title: 'Portfolio',
      items: [
        {
          label: 'Profile',
          route: '/dashboard/profile',
          icon: 'lucide:user-round',
        },
        {
          label: 'About',
          route: '/dashboard/about',
          icon: 'lucide:info',
        },
      ],
    },
    {
      title: 'Content',
      items: [
        {
          label: 'Projects',
          route: '/dashboard/projects',
          icon: 'lucide:folder-kanban',
        },
        {
          label: 'Experience',
          route: '/dashboard/experience',
          icon: 'lucide:briefcase-business',
        },
        {
          label: 'Skills',
          route: '/dashboard/skills',
          icon: 'lucide:brain',
        },
        {
          label: 'Stats',
          route: '/dashboard/stats',
          icon: 'lucide:chart-no-axes-combined',
        },
        {
          label: 'Testimonials',
          route: '/dashboard/testimonials',
          icon: 'lucide:message-square-quote',
        },
        {
          label: 'Contacts',
          route: '/dashboard/contacts',
          icon: 'lucide:contact-round',
        },
      ],
    },
  ];

  openMobileMenu(): void {
    this.mobileMenuOpen = true;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  logout(): void {
    this.closeMobileMenu();
    this.authService.logout();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 1024) {
      this.closeMobileMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMobileMenu();
  }
}

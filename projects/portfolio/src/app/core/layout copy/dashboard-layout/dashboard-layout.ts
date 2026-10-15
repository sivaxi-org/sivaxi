import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ThemeSwitcher } from '../../../shared/components/theme-switcher/theme-switcher';
import { IMAGE_PATHS } from '../../../shared/constants/image-constants';
import { ThemeService } from '../../theme/theme.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ThemeSwitcher
],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {
 
  readonly images = IMAGE_PATHS;


    authService = inject(AuthService);

  readonly themeService = inject(ThemeService)

  mobileMenuOpen = false;


  openMobileMenu(): void {
    this.mobileMenuOpen = true;
  }


  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }


  logout(): void {
    this.authService.logout();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const width = (event.target as Window).innerWidth;

    if (width >= 1024) {
      this.mobileMenuOpen = false;
    }
  }



  
}
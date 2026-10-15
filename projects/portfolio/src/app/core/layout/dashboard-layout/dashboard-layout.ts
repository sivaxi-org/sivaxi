import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from 'shared';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {
 



    authService = inject(AuthService);


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
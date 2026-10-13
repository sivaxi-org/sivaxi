import { Component, inject } from '@angular/core';
import { ThemeService } from './theme-service';

@Component({
  selector: 'lib-theme',
  standalone: true,
  templateUrl: './theme.html',
})
export class ThemeComponent {
  readonly themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
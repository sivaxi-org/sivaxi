import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ThemeService } from './theme-service';
import 'iconify-icon';

@Component({
  selector: 'lib-theme',
  standalone: true,
  templateUrl: './theme.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThemeComponent {
  readonly themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}

import { Component, inject } from '@angular/core';
import { SIVAXI_BRANDING } from '../../constants/branding';
import { ThemeService } from '../theme/theme-service';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
})
export class SiteFooter {
  readonly currentYear = new Date().getFullYear();
  readonly branding = SIVAXI_BRANDING;

  readonly themeService = inject(ThemeService);

  get logoUrl(): string {
    return this.themeService.isDark()
      ? this.branding.logos.primaryHorizontalLight
      : this.branding.logos.primaryHorizontalDark;
  }
}

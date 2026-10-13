import { Component, inject } from '@angular/core';
import { ThemeComponent } from '../theme/theme.component';
import { SIVAXI_BRANDING } from '../../constants/branding';
import { ThemeService } from '../theme/theme-service';

@Component({
  imports: [ThemeComponent],
  selector: 'app-site-header',
  styleUrl: './site-header.css',
  templateUrl: './site-header.html',
})
export class SiteHeader {
   readonly branding = SIVAXI_BRANDING;
   themeService = inject(ThemeService)

  get logoUrl(): string {
    return this.themeService.isDark()
      ? this.branding.logos.primaryHorizontalLight
      : this.branding.logos.primaryHorizontalDark;
  }
}

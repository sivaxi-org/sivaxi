import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { SIVAXI_BRANDING, ThemeService } from 'shared';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Footer {
  currentYear = "2026"

  themeService = inject(ThemeService)

  branding = signal(SIVAXI_BRANDING)
}

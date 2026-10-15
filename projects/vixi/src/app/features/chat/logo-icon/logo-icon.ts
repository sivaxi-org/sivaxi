import { Component, inject } from '@angular/core';
import { ThemeService } from 'shared';
import { appLogos } from '../../../core/constants/logo.constants';

@Component({
  imports: [],
  selector: 'app-logo-icon',
  styleUrl: './logo-icon.css',
  templateUrl: './logo-icon.html',
})
export class LogoIcon {

    themeService = inject(ThemeService)
    logos = appLogos;

}

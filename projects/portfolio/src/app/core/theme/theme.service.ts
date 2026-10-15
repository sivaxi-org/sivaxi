import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private readonly storageKey = 'sivaxi-theme';

  readonly theme = signal<Theme>(this.getStoredTheme());

  constructor() {
    this.applyTheme(this.theme());
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);

    localStorage.setItem(this.storageKey, theme);

    this.applyTheme(theme);
  }

  toggleTheme(): void {
    this.setTheme(
      this.theme() === 'light'
        ? 'dark'
        : 'light'
    );
  }

  private applyTheme(theme: Theme): void {
    const html = document.documentElement;

    html.classList.remove('light', 'dark');
    html.classList.add(theme);
  }

  private getStoredTheme(): Theme {
    const stored = localStorage.getItem(this.storageKey);

    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    return 'light';
  }
}
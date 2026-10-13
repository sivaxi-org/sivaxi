import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';

export type SivaxiTheme = 'dark' | 'light';

const THEME_KEY = 'sivaxi-theme';
const MAX_AGE = 60 * 60 * 24 * 365;
const CHANNEL_NAME = 'sivaxi-theme-sync';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly currentTheme = signal<SivaxiTheme>(this.readSavedTheme());

  readonly theme = this.currentTheme.asReadonly();
  readonly isDark = computed(() => this.currentTheme() === 'dark');

  private channel?: BroadcastChannel;

  constructor() {
    this.applyTheme(this.currentTheme());
    this.initializeSync();
  }

  setTheme(theme: SivaxiTheme): void {
    if (theme === this.currentTheme()) return;

    this.currentTheme.set(theme);
    this.applyTheme(theme);
    this.persistTheme(theme);
    this.channel?.postMessage({ theme });
  }

  toggleTheme(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  private initializeSync(): void {
    const win = this.document.defaultView;

    if (!win || !('BroadcastChannel' in win)) return;

    this.channel = new win.BroadcastChannel(CHANNEL_NAME);

    this.channel.onmessage = (event: MessageEvent) => {
      const theme = event.data?.theme;

      if (theme !== 'light' && theme !== 'dark') return;

      this.currentTheme.set(theme);
      this.applyTheme(theme);
    };
  }

  private readSavedTheme(): SivaxiTheme {
    const cookie = this.readCookie();

    if (cookie) return cookie;

    try {
      const saved = this.document.defaultView?.localStorage.getItem(THEME_KEY);

      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // Storage may be unavailable.
    }

    return 'dark';
  }

  private readCookie(): SivaxiTheme | null {
    const match = this.document.cookie.match(
      /(?:^|;\s*)sivaxi-theme=(dark|light)(?:;|$)/,
    );

    return match?.[1] === 'light' || match?.[1] === 'dark'
      ? match[1]
      : null;
  }

  private persistTheme(theme: SivaxiTheme): void {
const hostname = this.document.location?.hostname ?? '';

const isSivaxiDomain =
  hostname === 'sivaxi.com' ||
  hostname.endsWith('.sivaxi.com');

const isLocalDomain =
  hostname === 'sivaxi.test' ||
  hostname.endsWith('.sivaxi.test');

const domain =
  isSivaxiDomain || isLocalDomain
    ? `; Domain=${isSivaxiDomain ? '.sivaxi.com' : '.sivaxi.test'}`
    : '';

    const secure =
      this.document.location?.protocol === 'https:' ? '; Secure' : '';

    this.document.cookie =
      `${THEME_KEY}=${theme}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${domain}${secure}`;

    try {
      this.document.defaultView?.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Cookie persistence may still work.
    }
  }

  private applyTheme(theme: SivaxiTheme): void {
    this.document.documentElement.setAttribute('data-theme', theme);
  }
}
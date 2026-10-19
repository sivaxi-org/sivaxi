
const hostname =
  typeof window !== 'undefined' ? window.location.hostname : '';

const isLocal =
  hostname.endsWith('.sivaxi.test') ||
  hostname === 'localhost' ||
  hostname === '127.0.0.1';

const protocol = isLocal ? 'http:' : 'https:';
const domain = isLocal ? 'sivaxi.test' : 'sivaxi.com';

export const APP_LINKS = {
  shell: `${protocol}//${isLocal ? 'shell.' : ''}${domain}`,
  vixi: `${protocol}//ai.${domain}`,
  portfolio: `${protocol}//portfolio.${domain}`,
} as const;

export const SHELL_ROUTES = {
  home: '/',
  vixi: '/vixi',
  portfolio: '/portfolio/home',
} as const;

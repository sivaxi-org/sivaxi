
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import Keycloak from 'keycloak-js';
import { from, switchMap } from 'rxjs';

/**
 * Only requests targeting these configured API origins
 * can receive the Keycloak access token.
 */
export const SIVAXI_API_ORIGINS = new InjectionToken<readonly string[]>(
  'SIVAXI_API_ORIGINS',
  {
    providedIn: 'root',
    factory: () => [],
  },
);

/**
 * Public endpoints that must never receive a Keycloak token.
 * Match both the HTTP method and pathname.
 */
export const SIVAXI_PUBLIC_API_ENDPOINTS = new InjectionToken<
  readonly { method: string; path: string }[]
>('SIVAXI_PUBLIC_API_ENDPOINTS', {
  providedIn: 'root',
  factory: () => [
    { method: 'GET', path: '/api/public/**' },
    { method: 'POST', path: '/api/auth/login' },
  ],
});

export const sivaxiAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(Keycloak);
  const apiOrigins = inject(SIVAXI_API_ORIGINS);
  const publicEndpoints = inject(SIVAXI_PUBLIC_API_ENDPOINTS);

  let requestUrl: URL;

  try {
    requestUrl = new URL(req.url, window.location.origin);
  } catch {
    return next(req);
  }

  // Never attach tokens to untrusted origins.
  const isTrustedApi = apiOrigins.some((origin) => {
    try {
      return requestUrl.origin === new URL(origin).origin;
    } catch {
      return false;
    }
  });

  if (!isTrustedApi) {
    return next(req);
  }

  // Skip authentication for explicitly public endpoints.
  const isPublicEndpoint = publicEndpoints.some(
    ({ method, path }) =>
      req.method.toUpperCase() === method.toUpperCase() &&
      matchesPath(requestUrl.pathname, path),
  );

  if (isPublicEndpoint) {
    return next(req);
  }

  // Refresh an expiring token before sending protected requests.
  return from(keycloak.updateToken(30)).pipe(
    switchMap(() => {
      const token = keycloak.token;

      if (!token) {
        return next(req);
      }

      return next(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
    }),
  );
};

/**
 * Supports exact paths and simple /** suffix patterns.
 * Examples: /api/public/status, /api/public/**
 */
function matchesPath(pathname: string, pattern: string): boolean {
  if (pattern.endsWith('/**')) {
    const prefix = pattern.slice(0, -3);
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  }

  return pathname === pattern;
}

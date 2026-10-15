import { HttpInterceptorFn } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import Keycloak from 'keycloak-js';
import { from, switchMap } from 'rxjs';

/**
 * Only requests targeting these configured API origins
 * will receive the Keycloak access token.
 */
export const SIVAXI_API_ORIGINS = new InjectionToken<readonly string[]>(
  'SIVAXI_API_ORIGINS',
  {
    providedIn: 'root',
    factory: () => [],
  },
);

export const sivaxiAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(Keycloak);
  const apiOrigins = inject(SIVAXI_API_ORIGINS);

  // Resolve relative URLs against the current application origin.
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

  // Refresh an expiring token before sending the request.
  return from(keycloak.updateToken(30)).pipe(
    switchMap(() => {
      const token = keycloak.token;

      if (!token) {
        return next(req);
      }

      const authenticatedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next(authenticatedRequest);
    }),
  );
};
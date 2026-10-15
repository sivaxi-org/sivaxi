import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Let Iconify requests pass through without authentication
  if (req.url.includes('api.iconify.design')) {
    return next(req);
  }

  const authService = inject(AuthService);

  if (!authService.token) {
    return next(req);
  }

  const authenticatedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.token}`
    }
  });

  return next(authenticatedRequest);
};
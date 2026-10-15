import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';


export const authGuard: CanActivateFn = async () => {

  const authService = inject(AuthService);

  if (authService.authenticated) {
    return true;
  }

  authService.login();

  return false;
};
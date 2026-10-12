
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth';

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);

  if (auth.isAuthenticated()) {
    return true;
  }

  void auth.login();
  return false;
};

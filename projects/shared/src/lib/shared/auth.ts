
import { Injectable, inject } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly keycloak = inject(Keycloak);

  login(): void {
    void this.keycloak.login();
  }

  logout(): void {
    void this.keycloak.logout({
      redirectUri: window.location.origin,
    });
  }

  isAuthenticated(): boolean {
    return this.keycloak.authenticated ?? false;
  }

  getUsername(): string | undefined {
    return this.keycloak.tokenParsed?.['preferred_username'] as
      | string
      | undefined;
  }

  getRoles(): string[] {
    return this.keycloak.realmAccess?.roles ?? [];
  }
}

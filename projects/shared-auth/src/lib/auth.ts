import { Injectable, signal } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly keycloak = new Keycloak({
    url: 'https://auth.sivaxi.co',
    realm: 'portfolio',
    clientId: 'portfolio',
  });

  private readonly initialized = signal(false);
  private readonly authenticated = signal(false);

  readonly isInitialized = this.initialized.asReadonly();
  readonly isAuthenticated = this.authenticated.asReadonly();

  async init(): Promise<boolean> {
    if (this.initialized()) {
      return this.authenticated();
    }

    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      checkLoginIframe: false,
    });

    this.authenticated.set(authenticated);
    this.initialized.set(true);

    this.keycloak.onAuthSuccess = () => this.authenticated.set(true);
    this.keycloak.onAuthLogout = () => this.authenticated.set(false);
    this.keycloak.onAuthRefreshSuccess = () => this.authenticated.set(true);
    this.keycloak.onAuthRefreshError = () => this.authenticated.set(false);

    return authenticated;
  }

  login(): Promise<void> {
    return this.keycloak.login();
  }

  logout(): Promise<void> {
    return this.keycloak.logout({
      redirectUri: window.location.origin,
    });
  }

  async getToken(): Promise<string | undefined> {
    if (!this.keycloak.authenticated) {
      return undefined;
    }

    await this.keycloak.updateToken(30);
    return this.keycloak.token;
  }
}
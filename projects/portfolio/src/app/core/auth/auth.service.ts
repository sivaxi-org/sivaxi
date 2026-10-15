import { Injectable } from '@angular/core';

import { keycloak } from './keycloak';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async init(): Promise<boolean> {
    return keycloak.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      checkLoginIframe: false
    });
  }

  async login(): Promise<void> {
    await keycloak.login();
  }

  async logout(): Promise<void> {
    await keycloak.logout({
      redirectUri: window.location.origin
    });
  }

  get authenticated(): boolean {
    return keycloak.authenticated ?? false;
  }

  get token(): string | undefined {
    return keycloak.token;
  }

  get username(): string | undefined {
    return keycloak.tokenParsed?.['preferred_username'];
  }

get fullName(): string | undefined {
  const firstName = keycloak.tokenParsed?.['given_name'];
  const lastName = keycloak.tokenParsed?.['family_name'];

  return [firstName, lastName]
    .filter(Boolean)
    .join(' ') || undefined;
}

get firstName(): string | undefined {
  const firstName = keycloak.tokenParsed?.['given_name'];
  return firstName
}

get lastName(): string | undefined {
  const lastName = keycloak.tokenParsed?.['family_name'];

  return lastName;
}

  get email(): string | undefined {
    return keycloak.tokenParsed?.['email'];
  }

  get userId(): string | undefined {
  return keycloak.tokenParsed?.['sub'];
}

  async updateToken(minValidity = 30): Promise<boolean> {
    try {
      return await keycloak.updateToken(minValidity);
    } catch (error) {
      console.error('Failed to refresh Keycloak token', error);
      return false;
    }
  }
}
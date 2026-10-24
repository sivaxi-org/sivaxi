import { Injectable, inject, signal } from '@angular/core';
import Keycloak from 'keycloak-js';

export interface DirectGrantCredentials {
  username: string;
  password: string;
}

export interface DirectGrantResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  refresh_expires_in?: number;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly keycloak = inject(Keycloak);

  private readonly baseUrl = 'https://auth.sivaxi.com';
  private readonly realm = 'portfolio';
  private readonly clientId = 'sivaxi-auth';

  async login(): Promise<void> {
    await this.keycloak.login();
  }

  async loginWithCredentials(
    credentials: DirectGrantCredentials,
  ): Promise<DirectGrantResponse> {
    const body = new URLSearchParams({
      grant_type: 'password',
      client_id: this.clientId,
      username: credentials.username,
      password: credentials.password,
    });

    const response = await fetch(
      `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        typeof result.error_description === 'string'
          ? result.error_description
          : 'Unable to sign in. Check your credentials and try again.',
      );
    }

    return result as DirectGrantResponse;
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
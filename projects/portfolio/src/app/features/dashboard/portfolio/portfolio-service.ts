import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

export interface ProfileRequest {
  siteTitle: string;
  metaDescription: string | null;
  resumeUrl: string | null;
  theme: string | null;
  displayName: string;
  active: boolean;
  headline: string | null;
  bio: string | null;
  avatarUrl: string | null;
}

export interface ProfileResponse extends ProfileRequest {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private readonly apiUrl = `${environment.apiUrl}/api/profile`;

  constructor(
    private readonly http: HttpClient
  ) {}

  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(this.apiUrl);
  }

  createProfile(profile: ProfileRequest): Observable<ProfileResponse> {
    return this.http.post<ProfileResponse>(
      this.apiUrl,
      profile
    );
  }

  updateProfile(profile: ProfileRequest): Observable<ProfileResponse> {
    return this.http.put<ProfileResponse>(
      this.apiUrl,
      profile
    );
  }

  deleteProfile(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}
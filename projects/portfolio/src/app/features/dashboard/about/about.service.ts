import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

export interface AboutDto {
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private readonly apiUrl = `${environment.apiUrl}/api/about`;

  constructor(
    private readonly http: HttpClient
  ) {}

  getAbout(): Observable<AboutDto> {
    return this.http.get<AboutDto>(this.apiUrl);
  }

  updateAbout(about: AboutDto): Observable<AboutDto> {
    return this.http.put<AboutDto>(
      this.apiUrl,
      about
    );
  }

  deleteAbout(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}
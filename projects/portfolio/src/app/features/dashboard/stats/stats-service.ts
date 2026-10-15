
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface StatsRequest {
  label: string;
  value: string;
  icon: string;
  sortOrder: number;
  visible: boolean;
}

export interface StatsDto extends StatsRequest {
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private readonly apiUrl = `${environment.apiUrl}/api/stats`;

  constructor(
    private readonly http: HttpClient
  ) {}

  getStats(visibleOnly = false): Observable<StatsDto[]> {
    return this.http.get<StatsDto[]>(
      `${this.apiUrl}?visibleOnly=${visibleOnly}`
    );
  }

  getStat(uid: string): Observable<StatsDto> {
    return this.http.get<StatsDto>(
      `${this.apiUrl}/${uid}`
    );
  }

  createStat(stat: StatsRequest): Observable<StatsDto> {
    return this.http.post<StatsDto>(
      this.apiUrl,
      stat
    );
  }

  updateStat(
    uid: string,
    stat: StatsRequest
  ): Observable<StatsDto> {
    return this.http.put<StatsDto>(
      `${this.apiUrl}/${uid}`,
      stat
    );
  }

  deleteStat(uid: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${uid}`
    );
  }
}


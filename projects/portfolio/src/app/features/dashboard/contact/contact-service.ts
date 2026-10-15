
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

export interface ContactRequest {
  icon: string;
  type: string;
  title: string;
  link: string;
  sortOrder: number;
  visible: boolean;
}

export interface ContactDto extends ContactRequest {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly apiUrl =
    `${environment.apiUrl}/api/contacts`;

  constructor(
    private readonly http: HttpClient
  ) {}

  getContacts(
    visibleOnly = false
  ): Observable<ContactDto[]> {
    return this.http.get<ContactDto[]>(
      `${this.apiUrl}?visibleOnly=${visibleOnly}`
    );
  }

  getContact(
    id: string
  ): Observable<ContactDto> {
    return this.http.get<ContactDto>(
      `${this.apiUrl}/${id}`
    );
  }

  createContact(
    contact: ContactRequest
  ): Observable<ContactDto> {
    return this.http.post<ContactDto>(
      this.apiUrl,
      contact
    );
  }

  updateContact(
    id: string,
    contact: ContactRequest
  ): Observable<ContactDto> {
    return this.http.put<ContactDto>(
      `${this.apiUrl}/${id}`,
      contact
    );
  }

  deleteContact(
    id: string
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}


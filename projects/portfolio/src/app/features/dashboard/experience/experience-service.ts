import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


export interface ExperienceRequest {
company: string;
companyUrl: string | null;
companyLogoUrl: string | null;
jobTitle: string;
startDate: string;
endDate: string | null;
sortOrder: number;
visible: boolean;
}

export interface ExperienceDto extends ExperienceRequest {
id: string;
}

@Injectable({
providedIn: 'root'
})
export class ExperienceService {

private readonly apiUrl = `${environment.apiUrl}/api/experiences`;

constructor(
private readonly http: HttpClient
) {}

getExperiences(visibleOnly = false): Observable<ExperienceDto[]> {
return this.http.get<ExperienceDto[]>(
`${this.apiUrl}?visibleOnly=${visibleOnly}`
);
}

getExperience(id: string): Observable<ExperienceDto> {
return this.http.get<ExperienceDto>(
`${this.apiUrl}/${id}`
);
}

createExperience(
experience: ExperienceRequest
): Observable<ExperienceDto> {
return this.http.post<ExperienceDto>(
this.apiUrl,
experience
);
}

updateExperience(
id: string,
experience: ExperienceRequest
): Observable<ExperienceDto> {
return this.http.put<ExperienceDto>(
`${this.apiUrl}/${id}`,
experience
);
}

deleteExperience(id: string): Observable<void> {
return this.http.delete<void>(
`${this.apiUrl}/${id}`
);
}
}

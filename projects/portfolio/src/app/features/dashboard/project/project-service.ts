import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from '../../../../environments/environment';

export interface ProjectRequest {
  title: string;
  slug: string;
  summary: string | null;
  thumbnailUrl: string | null;
  liveUrl: string | null;
  sourceUrl: string | null;
  sortOrder: number;
  featured: boolean;
  visible: boolean;
}

export interface ProjectDto extends ProjectRequest {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly apiUrl =
    `${environment.apiUrl}/api/projects`;

  constructor(
    private readonly http: HttpClient
  ) {}

  getProjects(): Observable<ProjectDto[]> {

    return this.http.get<ProjectDto[]>(
      environment.apiUrl+ "/api/public/projects/ajaymalah"
    );

  }

  getProject(
    id: string
  ): Observable<ProjectDto> {

    return this.http.get<ProjectDto>(
      `${this.apiUrl}/${id}`
    );

  }

  createProject(
    project: ProjectRequest
  ): Observable<ProjectDto> {

    return this.http.post<ProjectDto>(
      this.apiUrl,
      project
    );

  }

  updateProject(
    id: string,
    project: ProjectRequest
  ): Observable<ProjectDto> {

    return this.http.put<ProjectDto>(
      `${this.apiUrl}/${id}`,
      project
    );

  }

  deleteProject(
    id: string
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

  getProjectTags(id: string): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/${id}/tags`);
}

replaceProjectTags(id: string, tags: string[]): Observable<string[]> {
  return this.http.put<string[]>(
    `${this.apiUrl}/${id}/tags`,
    tags
  );
}

}
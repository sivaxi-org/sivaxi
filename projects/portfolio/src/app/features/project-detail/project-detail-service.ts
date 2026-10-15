import { Injectable, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProjectDto } from '../dashboard/project/project-service';
import { ContentBlock } from '../../shared/components/content-block/content-block.model';
import { Observable } from 'rxjs';


export interface ProjectSlugResponse extends ProjectDto{
    items: ContentBlock[] | null
}


@Injectable({
    providedIn: "root"
})
export class ProjectDetailService {

    url = environment.apiUrl

    constructor(private readonly http:HttpClient){

    }


    getProjectDetails(slug: string): Observable<ProjectSlugResponse> {
      return this.http.get<ProjectSlugResponse>(
    `${this.url}/api/public/projects/slug/${slug}`
   );
}


}

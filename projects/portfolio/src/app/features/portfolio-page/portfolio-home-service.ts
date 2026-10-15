import { ContentBlock } from '../../shared/components/content-block/content-block.model';

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactDto } from '../dashboard/contact/contact-service';
import { ExperienceDto } from '../dashboard/experience/experience-service';
import { ProfileResponse } from '../dashboard/portfolio/portfolio-service';
import { ProjectDto } from '../dashboard/project/project-service';
import { StatsDto } from '../dashboard/stats/stats-service';
import { TestimonialDto } from '../dashboard/testimonial/testimonial-service';
import { environment } from '../../../environments/environment';

export interface PortfolioHomeResponse {
  portfolioId: string;
  userId: string;
  username: string;

  portfolioData: ProfileResponse;

  aboutData: {
    title: string;
    contentBlocks: ContentBlock[];
  };

  experienceData: {
    experiences: ExperienceDto[];
  };

  skillsData: {
    categories: any;
  };

  projectsData: {
    projects: ProjectDto[];
  };

  testimonialsData: {
    testimonials: TestimonialDto[];
  };

  contactsData: {
    contacts: ContactDto[];
  };

  statsData: {
    stats: StatsDto[];
  };

  updatedAt: string;
}



@Injectable({
  providedIn: 'root'
})
export class PortfolioHomeService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl =  environment.apiUrl +'/api/public/portfolio';

  getPortfolio(username: string): Observable<PortfolioHomeResponse> {
    return this.http.get<PortfolioHomeResponse>(
      `${this.baseUrl}/${encodeURIComponent(username)}`
    );
  }
}
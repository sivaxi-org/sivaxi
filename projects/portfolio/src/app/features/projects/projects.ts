import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectDto, ProjectService } from '../dashboard/project/project-service';

@Component({
  imports: [],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  projects = signal<ProjectDto[]>([]);

  constructor(private readonly projectService: ProjectService) {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (res) => this.projects.set(res),
      error: (error) => console.log(error),
    });
  }

  projectDetails(slug: string): void {
    // Navigates relative to this component's current route, e.g.
    // '/projects' -> '/projects/:slug'.
    this.router.navigate([slug], { relativeTo: this.route });
  }
}
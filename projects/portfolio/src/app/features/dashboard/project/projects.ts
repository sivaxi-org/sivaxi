import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import {
  ProjectDto,
  ProjectRequest,
  ProjectService
} from './project-service';
import { ProjectForm } from './components/form/form';


@Component({
  selector: 'app-projects',
  imports: [ProjectForm],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit {

  private readonly projectService = inject(ProjectService);
  private readonly router = inject(Router);

  projects = signal<ProjectDto[]>([]);
  loading = signal(true);
  showForm = signal(false);

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading.set(true);

    this.projectService.getProjects().subscribe({
      next: projects => {
        this.projects.set(projects);
        this.loading.set(false);
      },
      error: error => {
        console.error('Failed to load projects:', error);
        this.loading.set(false);
      }
    });
  }

  openAddProject(): void {
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
  }

  createProject(project: ProjectRequest): void {
    const newProject = {
      ...project,
      sortOrder: this.projects().length
    };

    this.projectService.createProject(newProject).subscribe({
      next: created => {
        this.projects.update(projects => [
          ...projects,
          created
        ]);

        this.closeForm();
      },
      error: error => {
        console.error('Failed to create project:', error);
      }
    });
  }

  openProject(project: ProjectDto): void {
    this.router.navigate([
      '/dashboard/projects',
      project.id
    ]);
  }

  deleteProject(project: ProjectDto): void {
    this.projectService.deleteProject(project.id).subscribe({
      next: () => {
        this.projects.update(projects =>
          projects.filter(item => item.id !== project.id)
        );
      },
      error: error => {
        console.error('Failed to delete project:', error);
      }
    });
  }
}
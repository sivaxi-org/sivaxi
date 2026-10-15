import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentBlockManager } from '../../../../../shared/components/content-block-manager/content-block-manager';
import { ProjectService, ProjectDto, ProjectRequest } from '../../project-service';
import { ProjectForm } from '../form/form';


@Component({
selector: 'app-project-detail',
imports: [
ProjectForm,
ContentBlockManager
],
templateUrl: './project-detail.html',
styleUrl: './project-detail.css'
})
export class ProjectDetail implements OnInit {

private readonly route = inject(ActivatedRoute);
private readonly router = inject(Router);
private readonly projectService = inject(ProjectService);

project = signal<ProjectDto | null>(null);
projectId = signal('');

loading = signal(true);

tags = signal<string[]>([]);
newTag = signal('');

tagsLoading = signal(false);
tagsSaving = signal(false);

ngOnInit(): void {
const id = this.route.snapshot.paramMap.get('id');


if (!id) {
  this.back();
  return;
}

this.projectId.set(id);

this.loadProject(id);
this.loadTags(id);


}

loadProject(id: string): void {
this.loading.set(true);


this.projectService.getProject(id).subscribe({
  next: project => {
    this.project.set(project);
    this.loading.set(false);
  },
  error: error => {
    console.error('Failed to load project:', error);
    this.loading.set(false);
  }
});


}

loadTags(id: string): void {
this.tagsLoading.set(true);


this.projectService.getProjectTags(id).subscribe({
  next: tags => {
    this.tags.set(tags);
    this.tagsLoading.set(false);
  },
  error: error => {
    console.error('Failed to load project tags:', error);
    this.tagsLoading.set(false);
  }
});


}

saveProject(request: ProjectRequest): void {
const current = this.project();


if (!current) {
  return;
}

this.projectService.updateProject(current.id, request).subscribe({
  next: updatedProject => {
    this.project.set(updatedProject);
  },
  error: error => {
    console.error('Failed to update project:', error);
  }
});


}

updateNewTag(value: string): void {
this.newTag.set(value);
}

addTag(): void {
const tag = this.newTag().trim();


if (!tag) {
  return;
}

const exists = this.tags().some(
  existingTag => existingTag.toLowerCase() === tag.toLowerCase()
);

if (exists) {
  this.newTag.set('');
  return;
}

this.tags.update(tags => [...tags, tag]);
this.newTag.set('');


}

removeTag(tagToRemove: string): void {
this.tags.update(tags =>
tags.filter(tag => tag !== tagToRemove)
);
}

saveTags(): void {
const id = this.projectId();


if (!id) {
  return;
}

this.tagsSaving.set(true);

this.projectService.replaceProjectTags(id, this.tags()).subscribe({
  next: tags => {
    this.tags.set(tags);
    this.tagsSaving.set(false);
  },
  error: error => {
    console.error('Failed to save project tags:', error);
    this.tagsSaving.set(false);
  }
});


}

back(): void {
this.router.navigate(['/dashboard/projects']);
}
}

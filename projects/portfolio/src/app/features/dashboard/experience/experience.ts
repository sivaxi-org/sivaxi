import {
Component,
OnInit,
inject,
signal
} from '@angular/core';

import { Router } from '@angular/router';



import { ExperienceForm } from './experience-form/experience-form';
import { ExperienceDto, ExperienceRequest, ExperienceService } from './experience-service';

@Component({
selector: 'app-experience',
imports: [ExperienceForm],
templateUrl: './experience.html',
styleUrl: './experience.css'
})
export class Experience implements OnInit {

private readonly experienceService = inject(ExperienceService);
private readonly router = inject(Router);

experiences = signal<ExperienceDto[]>([]);
loading = signal(true);
showForm = signal(false);

ngOnInit(): void {
this.loadExperiences();
}

loadExperiences(): void {
this.loading.set(true);


this.experienceService.getExperiences().subscribe({
  next: experiences => {
    this.experiences.set(
      [...experiences].sort(
        (a, b) => a.sortOrder - b.sortOrder
      )
    );

    this.loading.set(false);
  },
  error: error => {
    console.error(
      'Failed to load experiences:',
      error
    );

    this.loading.set(false);
  }
});


}

openAddExperience(): void {
this.showForm.set(true);
}

closeForm(): void {
this.showForm.set(false);
}

createExperience(
experience: ExperienceRequest
): void {


const newExperience = {
  ...experience,
  sortOrder: this.experiences().length
};

this.experienceService
  .createExperience(newExperience)
  .subscribe({
    next: created => {

      this.experiences.update(experiences => [
        ...experiences,
        created
      ]);

      this.closeForm();
    },

    error: error => {
      console.error(
        'Failed to create experience:',
        error
      );
    }
  });


}

openExperience(
experience: ExperienceDto
): void {


this.router.navigate([
  '/dashboard/experience',
  experience.id
]);


}

deleteExperience(
experience: ExperienceDto
): void {


this.experienceService
  .deleteExperience(experience.id)
  .subscribe({
    next: () => {
      this.experiences.update(experiences =>
        experiences.filter(
          item => item.id !== experience.id
        )
      );
    },

    error: error => {
      console.error(
        'Failed to delete experience:',
        error
      );
    }
  });


}
}

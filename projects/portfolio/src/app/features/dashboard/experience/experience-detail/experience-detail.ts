import {
Component,
OnInit,
inject,
signal
} from '@angular/core';

import {
ActivatedRoute,
Router
} from '@angular/router';



import { ExperienceForm } from '../experience-form/experience-form';
import { ContentBlockManager } from '../../../../shared/components/content-block-manager/content-block-manager';
import { ExperienceDto, ExperienceRequest, ExperienceService } from '../experience-service';


@Component({
selector: 'app-experience-detail',
imports: [
ExperienceForm,
ContentBlockManager
],
templateUrl: './experience-detail.html',
styleUrl: './experience-detail.css'
})
export class ExperienceDetail implements OnInit {

private readonly route = inject(ActivatedRoute);
private readonly router = inject(Router);
private readonly experienceService = inject(ExperienceService);

experience = signal<ExperienceDto | null>(null);
experienceId = signal('');

loading = signal(true);

ngOnInit(): void {


const id = this.route.snapshot.paramMap.get('id');

if (!id) {
  this.back();
  return;
}

this.experienceId.set(id);

this.loadExperience(id);


}

loadExperience(id: string): void {


this.loading.set(true);

this.experienceService
  .getExperience(id)
  .subscribe({
    next: experience => {
      this.experience.set(experience);
      this.loading.set(false);
    },

    error: error => {
      console.error(
        'Failed to load experience:',
        error
      );

      this.loading.set(false);
    }
  });


}

saveExperience(
request: ExperienceRequest
): void {


const current = this.experience();

if (!current) {
  return;
}

this.experienceService
  .updateExperience(
    current.id,
    request
  )
  .subscribe({
    next: updatedExperience => {
      this.experience.set(updatedExperience);
    },

    error: error => {
      console.error(
        'Failed to update experience:',
        error
      );
    }
  });


}

back(): void {
this.router.navigate([
'/dashboard/experience'
]);
}
}

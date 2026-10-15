import {
Component,
effect,
input,
output,
signal
} from '@angular/core';

import {
ExperienceDto,
ExperienceRequest
} from '../experience-service';

@Component({
selector: 'app-experience-form',
imports: [],
templateUrl: './experience-form.html',
styleUrl: './experience-form.css'
})
export class ExperienceForm {

experience = input<ExperienceDto | null>(null);

cancelled = output<void>();
submitted = output<ExperienceRequest>();

company = signal('');
companyUrl = signal('');
companyLogoUrl = signal('');
jobTitle = signal('');
startDate = signal('');
endDate = signal('');
visible = signal(true);

constructor() {
effect(() => {
const current = this.experience();


  if (!current) {
    this.company.set('');
    this.companyUrl.set('');
    this.companyLogoUrl.set('');
    this.jobTitle.set('');
    this.startDate.set('');
    this.endDate.set('');
    this.visible.set(true);
    return;
  }

  this.company.set(current.company);
  this.companyUrl.set(current.companyUrl ?? '');
  this.companyLogoUrl.set(current.companyLogoUrl ?? '');
  this.jobTitle.set(current.jobTitle);
  this.startDate.set(current.startDate);
  this.endDate.set(current.endDate ?? '');
  this.visible.set(current.visible);
});


}

submit(): void {
const company = this.company().trim();
const jobTitle = this.jobTitle().trim();
const startDate = this.startDate();


if (!company || !jobTitle || !startDate) {
  return;
}

const current = this.experience();

this.submitted.emit({
  company,
  companyUrl: this.companyUrl().trim() || null,
  companyLogoUrl: this.companyLogoUrl().trim() || null,
  jobTitle,
  startDate,
  endDate: this.endDate() || null,
  sortOrder: current?.sortOrder ?? 0,
  visible: this.visible()
});


}

cancel(): void {
this.cancelled.emit();
}
}

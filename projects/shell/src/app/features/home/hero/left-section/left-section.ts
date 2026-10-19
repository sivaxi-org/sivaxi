import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IconLabel } from '../../../../core/components/icon-label/icon-label';
import { ButtonDirective } from '../../../../core/directives/button-directive/button-directive';
import { PillDirective } from '../../../../core/directives/button-directive/pill.directive';

@Component({
  imports: [IconLabel, ButtonDirective, PillDirective],
  selector: 'hero-left-section',
  styleUrl: './left-section.css',
  templateUrl: './left-section.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeftSection {

  engineeringAreas = [
  {
    icon: 'lucide:brain-circuit',
    title: 'AI & Agents',
  },
  {
    icon: 'lucide:layers-3',
    title: 'Web Platforms',
  },
  {
    icon: 'lucide:server',
    title: 'Backend Systems',
  },
];

}

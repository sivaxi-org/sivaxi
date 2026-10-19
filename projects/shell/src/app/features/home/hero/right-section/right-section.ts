import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';
import { PillDirective } from '../../../../core/directives/button-directive/pill.directive';
import { RightSectionCard } from '../right-section-card/right-section-card';


const ecosystemItems = [
  {
    icon: 'lucide:brain-circuit',
    title: 'Vixi AI',
    description: 'AI assistants and agentic workflows.',
  },
  {
    icon: 'lucide:panels-top-left',
    title: 'Web Platforms',
    description: 'Interfaces and connected applications.',
  },
  {
    icon: 'lucide:server',
    title: 'Core Services',
    description: 'APIs, infrastructure, and shared systems.',
  },
];

@Component({
  imports: [PillDirective,RightSectionCard],
  selector: 'hero-right-section',
  styleUrl: './right-section.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './right-section.html',
})
export class RightSection {
  
  ecosystem = signal(ecosystemItems)

}

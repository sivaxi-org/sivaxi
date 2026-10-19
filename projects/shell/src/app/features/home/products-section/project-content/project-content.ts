import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, input } from '@angular/core';
import { PillDirective } from '../../../../core/directives/button-directive/pill.directive';
import { ButtonDirective } from '../../../../core/directives/button-directive/button-directive';

export interface ProjectContentData {
  status: string;
  category: string;
  title: string;
  highlight?: string;
  description: string;
  technologies: {
    icon: string;
    label: string;
  }[];
  link: string;
  linkLabel: string;
}

@Component({
  selector: 'app-project-content',
  imports: [PillDirective,ButtonDirective],
  standalone: true,
  templateUrl: './project-content.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectContent {
  data = input.required<any>();

  constructor(){
    effect((data)=>{
      console.log(data);
    })
  }
}
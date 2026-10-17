import { Component, input, Input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-project-card',
  styleUrl: './project-card.css',
  templateUrl: './project-card.html',
})
export class ProjectCard {

  openProject = output<string>()
  project = input<any>()

  openProjectFn(slug:string){
    this.openProject.emit(slug)
  }
}

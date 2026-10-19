import { Component, input } from '@angular/core';
import { ProjectContent } from '../project-content/project-content';
import { WebsitePreview } from '../website-preview/website-preview';

@Component({
  imports: [
    ProjectContent,
    WebsitePreview
  ],
  selector: 'app-product-section',
  styleUrl: './product-section.css',
  templateUrl: './product-section.html',
})
export class ProductSection {

    project = input<any>();
    isEven = input();

}

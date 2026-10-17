import { Component, input } from '@angular/core';
import { ContentBlockRenderer } from '../../../shared/components/content-block-renderer/content-block-renderer';

@Component({
  selector: 'app-about',
  imports: [ContentBlockRenderer],
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About {
  readonly portfolioData =
    input<any| undefined>(undefined);

  readonly aboutData =
    input<any | undefined>(undefined);
}
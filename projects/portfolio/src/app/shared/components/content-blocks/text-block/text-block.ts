import {
  Component,
  input
} from '@angular/core';

import { TextLineClampComponent } from 'text-line-clamp';

import { TextBlockData } from '../../content-block/content-block.model';

@Component({
  selector: 'app-text-block',
  standalone: true,
  imports: [
    TextLineClampComponent
  ],
  template: `
    <text-line-clamp
      class="text-sm leading-7 text-text-muted"
      [text]="data().content"
      [clamp]="5"
      [buttonName]="'Show more'"
      [buttonColor]="'var(--accent-2)'"
    />
  `
})
export class TextBlock {

  data = input.required<TextBlockData>();

}
import {
  Component,
  input
} from '@angular/core';

import {
  RichTextBlockData
} from '../../content-block/content-block.model';
import { TextLineClampComponent } from 'text-line-clamp';

@Component({
  selector: 'app-rich-text-block',
  imports: [TextLineClampComponent],
  templateUrl: './rich-text-block.html',
  styleUrl: './rich-text-block.css'
})
export class RichTextBlock {

  data = input.required<RichTextBlockData>();

}
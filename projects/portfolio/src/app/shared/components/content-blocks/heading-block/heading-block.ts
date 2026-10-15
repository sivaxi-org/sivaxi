import {
  Component,
  input
} from '@angular/core';

import {
  HeadingBlockData
} from '../../content-block/content-block.model';
import { TextLineClampComponent } from 'text-line-clamp';

@Component({
  selector: 'app-heading-block',
  imports: [TextLineClampComponent],
  templateUrl: './heading-block.html',
  styleUrl: './heading-block.css'
})
export class HeadingBlock {

  data = input.required<HeadingBlockData>();

}
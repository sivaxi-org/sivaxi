import {
  Component,
  input
} from '@angular/core';

import {
  TitleBulletsBlockData
} from '../../content-block/content-block.model';
import { TextLineClampComponent } from 'text-line-clamp';

@Component({
  selector: 'app-title-bullets-block',
  imports: [TextLineClampComponent],
  templateUrl: './title-bullets-block.html',
  styleUrl: './title-bullets-block.css'
})
export class TitleBulletsBlock {

  data = input.required<TitleBulletsBlockData>();

}
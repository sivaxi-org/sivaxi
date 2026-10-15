import {
  Component,
  input
} from '@angular/core';

import {
  ImageBlockData
} from '../../content-block/content-block.model';

@Component({
  selector: 'app-image-block',
  imports: [],
  templateUrl: './image-block.html',
  styleUrl: './image-block.css'
})
export class ImageBlock {

  data = input.required<ImageBlockData>();

}
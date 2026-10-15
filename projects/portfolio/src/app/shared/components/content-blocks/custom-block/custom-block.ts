import {
  Component,
  input
} from '@angular/core';

import {
  JsonPipe
} from '@angular/common';

import {
  CustomBlockData
} from '../../content-block/content-block.model';

@Component({
  selector: 'app-custom-block',
  imports: [
    JsonPipe
  ],
  templateUrl: './custom-block.html',
  styleUrl: './custom-block.css'
})
export class CustomBlock {

  data = input.required<CustomBlockData>();

}
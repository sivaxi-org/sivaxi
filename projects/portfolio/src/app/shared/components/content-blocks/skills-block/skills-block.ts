import {
  Component,
  input
} from '@angular/core';

import {
  SkillsBlockData
} from '../../content-block/content-block.model';

@Component({
  selector: 'app-skills-block',
  imports: [],
  templateUrl: './skills-block.html',
  styleUrl: './skills-block.css'
})
export class SkillsBlock {

  data = input.required<SkillsBlockData>();

}
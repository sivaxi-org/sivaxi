import {
  Component,
  input
} from '@angular/core';
import { ContentBlock } from '../content-block/content-block.model';
import { CustomBlock } from '../content-blocks/custom-block/custom-block';
import { HeadingBlock } from '../content-blocks/heading-block/heading-block';
import { ImageBlock } from '../content-blocks/image-block/image-block';
import { RichTextBlock } from '../content-blocks/rich-text-block/rich-text-block';
import { SkillsBlock } from '../content-blocks/skills-block/skills-block';
import { TextBlock } from '../content-blocks/text-block/text-block';
import { TitleBulletsBlock } from '../content-blocks/title-bullets-block/title-bullets-block';


@Component({

  selector: 'app-content-block-renderer',

  imports: [

    TextBlock,

    HeadingBlock,

    ImageBlock,

    RichTextBlock,

    SkillsBlock,

    TitleBulletsBlock,

    CustomBlock

  ],

  templateUrl: './content-block-renderer.html',

  styleUrl: './content-block-renderer.css'

})
export class ContentBlockRenderer {

  block = input.required<any>();

}
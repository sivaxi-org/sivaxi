import {
  Component,
  output,
  signal
} from '@angular/core';
import { CustomBlockForm } from '../content-block-forms/custom-block-form/custom-block-form';
import { HeadingBlockForm } from '../content-block-forms/heading-block-form/heading-block-form';
import { ImageBlockForm } from '../content-block-forms/image-block-form/image-block-form';
import { RichTextBlockForm } from '../content-block-forms/rich-text-block-form/rich-text-block-form';
import { SkillsBlockForm } from '../content-block-forms/skills-block-form/skills-block-form';
import { TextBlockForm } from '../content-block-forms/text-block-form/text-block-form';
import { TitleBulletsBlockForm } from '../content-block-forms/title-bullets-block-form/title-bullets-block-form';
import { CONTENT_BLOCK_DEFINITIONS } from '../content-block/content-block-schema';
import { ContentBlock, ContentBlockType } from '../content-block/content-block.model';



@Component({
  selector: 'app-content-block-add',

  imports: [
    TextBlockForm,
    HeadingBlockForm,
    ImageBlockForm,
    RichTextBlockForm,
    SkillsBlockForm,
    TitleBulletsBlockForm,
    CustomBlockForm
  ],

  templateUrl: './content-block-add.html',

  styleUrl: './content-block-add.css'
})
export class ContentBlockAdd {

  readonly closed =
    output<void>();

  readonly submitted =
    output<ContentBlock>();


  readonly definitions =
    CONTENT_BLOCK_DEFINITIONS;


  selectedType =
    signal<ContentBlockType | null>(null);


  selectType(
    type: ContentBlockType
  ): void {

    this.selectedType.set(type);

  }


  back(): void {

    this.selectedType.set(null);

  }


  close(): void {

    this.closed.emit();

  }


  submitBlock(
    block: ContentBlock
  ): void {

    this.submitted.emit(block);

  }

}
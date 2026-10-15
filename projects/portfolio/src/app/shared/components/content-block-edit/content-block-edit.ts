import {
  Component,
  input,
  output
} from '@angular/core';
import { CustomBlockForm } from '../content-block-forms/custom-block-form/custom-block-form';
import { HeadingBlockForm } from '../content-block-forms/heading-block-form/heading-block-form';
import { ImageBlockForm } from '../content-block-forms/image-block-form/image-block-form';
import { RichTextBlockForm } from '../content-block-forms/rich-text-block-form/rich-text-block-form';
import { SkillsBlockForm } from '../content-block-forms/skills-block-form/skills-block-form';
import { TextBlockForm } from '../content-block-forms/text-block-form/text-block-form';
import { TitleBulletsBlockForm } from '../content-block-forms/title-bullets-block-form/title-bullets-block-form';
import { ContentBlock, ContentBlockDto } from '../content-block/content-block.model';


@Component({
  selector: 'app-content-block-edit',

  imports: [
    TextBlockForm,
    HeadingBlockForm,
    ImageBlockForm,
    RichTextBlockForm,
    SkillsBlockForm,
    TitleBulletsBlockForm,
    CustomBlockForm
  ],

  templateUrl: './content-block-edit.html',

  styleUrl: './content-block-edit.css'
})
export class ContentBlockEdit {

  block =
    input.required<ContentBlock>();

  readonly cancelled =
    output<void>();

  readonly submitted =
    output<ContentBlock>();


  get textBlock():
    ContentBlockDto<'TEXT'> {

    return this.block() as ContentBlockDto<'TEXT'>;

  }


  get headingBlock():
    ContentBlockDto<'HEADING'> {

    return this.block() as ContentBlockDto<'HEADING'>;

  }


  get imageBlock():
    ContentBlockDto<'IMAGE'> {

    return this.block() as ContentBlockDto<'IMAGE'>;

  }


  get richTextBlock():
    ContentBlockDto<'RICH_TEXT'> {

    return this.block() as ContentBlockDto<'RICH_TEXT'>;

  }


  get skillsBlock():
    ContentBlockDto<'SKILLS'> {

    return this.block() as ContentBlockDto<'SKILLS'>;

  }


  get titleBulletsBlock():
    ContentBlockDto<'TITLE_BULLETS'> {

    return this.block() as ContentBlockDto<'TITLE_BULLETS'>;

  }


  get customBlock():
    ContentBlockDto<'CUSTOM'> {

    return this.block() as ContentBlockDto<'CUSTOM'>;

  }


  cancel(): void {

    this.cancelled.emit();

  }


  submitBlock(
    block: ContentBlock
  ): void {

    this.submitted.emit(block);

  }

}
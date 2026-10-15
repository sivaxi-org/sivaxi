import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';

import {
  ContentBlockDto,
  RichTextBlockData
} from '../../content-block/content-block.model';

@Component({
  selector: 'app-rich-text-block-form',
  imports: [],
  templateUrl: './rich-text-block-form.html',
  styleUrl: './rich-text-block-form.css'
})
export class RichTextBlockForm {

  data = input<ContentBlockDto<'RICH_TEXT'> | null>(null);

  readonly cancelled =
    output<void>();

  readonly submitted =
    output<ContentBlockDto<'RICH_TEXT'>>();

  content =
    signal('');

  constructor() {

    effect(() => {

      const block = this.data();

      if (block) {

        this.content.set(
          block.data.content
        );

      }

    });

  }

  updateContent(
    value: string
  ): void {

    this.content.set(value);

  }

  cancel(): void {

    this.cancelled.emit();

  }

  submit(): void {

    const data: RichTextBlockData = {

      content: this.content()

    };

    const block: ContentBlockDto<'RICH_TEXT'> = {

      id: this.data()?.id,

      blockType: 'RICH_TEXT',

      data,

      sortOrder:
        this.data()?.sortOrder ?? 0

    };

    this.submitted.emit(block);

  }

}
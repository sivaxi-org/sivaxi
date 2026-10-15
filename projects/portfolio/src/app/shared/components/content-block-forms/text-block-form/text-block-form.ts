import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';

import {
  ContentBlockDto,
  TextBlockData
} from '../../content-block/content-block.model';

@Component({
  selector: 'app-text-block-form',
  imports: [],
  templateUrl: './text-block-form.html',
  styleUrl: './text-block-form.css'
})
export class TextBlockForm {

  data = input<ContentBlockDto<'TEXT'> | null>(null);

  readonly cancelled =
    output<void>();

  readonly submitted =
    output<ContentBlockDto<'TEXT'>>();

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

    const block: ContentBlockDto<'TEXT'> = {

      id: this.data()?.id,

      blockType: 'TEXT',

      data: {
        content: this.content()
      },

      sortOrder:
        this.data()?.sortOrder ?? 0

    };

    this.submitted.emit(block);

  }

}
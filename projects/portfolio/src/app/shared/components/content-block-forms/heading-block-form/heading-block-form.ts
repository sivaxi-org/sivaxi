import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';

import {
  ContentBlockDto,
  HeadingBlockData
} from '../../content-block/content-block.model';

@Component({
  selector: 'app-heading-block-form',
  imports: [],
  templateUrl: './heading-block-form.html',
  styleUrl: './heading-block-form.css'
})
export class HeadingBlockForm {

  data = input<ContentBlockDto<'HEADING'> | null>(null);

  readonly cancelled =
    output<void>();

  readonly submitted =
    output<ContentBlockDto<'HEADING'>>();

  text =
    signal('');

  level =
    signal<1 | 2 | 3 | 4 | 5 | 6>(2);

  constructor() {

    effect(() => {

      const block = this.data();

      if (block) {

        this.text.set(
          block.data.text
        );

        this.level.set(
          block.data.level
        );

      }

    });

  }

  updateText(
    value: string
  ): void {

    this.text.set(value);

  }

  updateLevel(
    value: string
  ): void {

    this.level.set(
      Number(value) as 1 | 2 | 3 | 4 | 5 | 6
    );

  }

  cancel(): void {

    this.cancelled.emit();

  }

  submit(): void {

    const data: HeadingBlockData = {

      text: this.text(),

      level: this.level()

    };

    const block: ContentBlockDto<'HEADING'> = {

      id: this.data()?.id,

      blockType: 'HEADING',

      data,

      sortOrder:
        this.data()?.sortOrder ?? 0

    };

    this.submitted.emit(block);

  }

}
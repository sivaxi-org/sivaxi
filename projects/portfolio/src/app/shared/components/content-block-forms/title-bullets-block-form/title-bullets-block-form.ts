import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';

import {
  ContentBlockDto,
  TitleBulletsBlockData
} from '../../content-block/content-block.model';

@Component({
  selector: 'app-title-bullets-block-form',
  imports: [],
  templateUrl: './title-bullets-block-form.html'
})
export class TitleBulletsBlockForm {

  data = input<ContentBlockDto<'TITLE_BULLETS'> | null>(null);

  readonly cancelled =
    output<void>();

  readonly submitted =
    output<ContentBlockDto<'TITLE_BULLETS'>>();

  title =
    signal('');

  items =
    signal<string[]>([]);

  newItem =
    signal('');

  constructor() {

    effect(() => {

      const block = this.data();

      if (block) {

        this.title.set(
          block.data.title
        );

        this.items.set(
          [...block.data.items]
        );

      }

    });

  }

  updateTitle(
    value: string
  ): void {

    this.title.set(value);

  }

  updateNewItem(
    value: string
  ): void {

    this.newItem.set(value);

  }

  addItem(): void {

    const item =
      this.newItem().trim();

    if (!item) {
      return;
    }

    this.items.update(
      items => [
        ...items,
        item
      ]
    );

    this.newItem.set('');

  }

  removeItem(
    index: number
  ): void {

    this.items.update(
      items =>
        items.filter(
          (_, i) => i !== index
        )
    );

  }

  cancel(): void {

    this.cancelled.emit();

  }

  submit(): void {

    const data: TitleBulletsBlockData = {

      title: this.title(),

      items: this.items()

    };

    const block: ContentBlockDto<'TITLE_BULLETS'> = {

      id: this.data()?.id,

      blockType: 'TITLE_BULLETS',

      data,

      sortOrder:
        this.data()?.sortOrder ?? 0

    };

    this.submitted.emit(block);

  }

}
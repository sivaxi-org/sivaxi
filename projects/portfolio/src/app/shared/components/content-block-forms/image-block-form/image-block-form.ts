import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';

import {
  ContentBlockDto,
  ImageBlockData
} from '../../content-block/content-block.model';

@Component({
  selector: 'app-image-block-form',
  imports: [],
  templateUrl: './image-block-form.html',
  styleUrl: './image-block-form.css'
})
export class ImageBlockForm {

  data = input<ContentBlockDto<'IMAGE'> | null>(null);

  readonly cancelled =
    output<void>();

  readonly submitted =
    output<ContentBlockDto<'IMAGE'>>();

  url =
    signal('');

  alt =
    signal('');

  constructor() {

    effect(() => {

      const block = this.data();

      if (block) {

        this.url.set(
          block.data.url
        );

        this.alt.set(
          block.data.alt
        );

      }

    });

  }

  updateUrl(
    value: string
  ): void {

    this.url.set(value);

  }

  updateAlt(
    value: string
  ): void {

    this.alt.set(value);

  }

  cancel(): void {

    this.cancelled.emit();

  }

  submit(): void {

    const data: ImageBlockData = {

      url: this.url(),

      alt: this.alt()

    };

    const block: ContentBlockDto<'IMAGE'> = {

      id: this.data()?.id,

      blockType: 'IMAGE',

      data,

      sortOrder:
        this.data()?.sortOrder ?? 0

    };

    this.submitted.emit(block);

  }

}
import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';

import {
  ContentBlockDto,
  CustomBlockData
} from '../../content-block/content-block.model';

@Component({
  selector: 'app-custom-block-form',
  imports: [],
  templateUrl: './custom-block-form.html',
  styleUrl: './custom-block-form.css'
})
export class CustomBlockForm {

  data = input<ContentBlockDto<'CUSTOM'> | null>(null);

  readonly cancelled =
    output<void>();

  readonly submitted =
    output<ContentBlockDto<'CUSTOM'>>();

  json =
    signal(`{
  "key": "value"
}`);

  constructor() {

    effect(() => {

      const block = this.data();

      if (block) {

        this.json.set(
          JSON.stringify(
            block.data,
            null,
            2
          )
        );

      }

    });

  }

  updateJson(
    value: string
  ): void {

    this.json.set(value);

  }

  cancel(): void {

    this.cancelled.emit();

  }

  submit(): void {

    try {

      const data =
        JSON.parse(this.json()) as CustomBlockData;

      if (
        typeof data !== 'object' ||
        data === null ||
        Array.isArray(data)
      ) {

        console.error(
          'Custom block data must be a JSON object'
        );

        return;

      }

      const block: ContentBlockDto<'CUSTOM'> = {

        id: this.data()?.id,

        blockType: 'CUSTOM',

        data,

        sortOrder:
          this.data()?.sortOrder ?? 0

      };

      this.submitted.emit(block);

    } catch (error) {

      console.error(
        'Invalid custom block JSON:',
        error
      );

    }

  }

}
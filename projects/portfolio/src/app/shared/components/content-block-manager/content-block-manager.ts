import {
  Component,
  OnInit,
  inject,
  input,
  signal
} from '@angular/core';


import {
  ContentBlockAdd
} from '../content-block-add/content-block-add';

import {
  ContentBlockEdit
} from '../content-block-edit/content-block-edit';
import { ContentBlockRenderer } from '../content-block-renderer/content-block-renderer';
import { ContentBlockService } from '../content-block/content-block-service';
import { ContentBlock } from '../content-block/content-block.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-content-block-manager',
  imports: [
    ContentBlockRenderer,
    ContentBlockAdd,
    ContentBlockEdit
  ],
  templateUrl: './content-block-manager.html',
  styleUrl: './content-block-manager.css'
})
export class ContentBlockManager implements OnInit {

  url = input.required<string>();

  private readonly contentBlockService =
    inject(ContentBlockService);

  blocks =
    signal<ContentBlock[]>([]);

  loading =
    signal(true);

  showAddBlock =
    signal(false);

  editingBlock =
    signal<ContentBlock | null>(null);

  ngOnInit(): void {
    this.loadBlocks();
  }

  loadBlocks(): void {

    this.loading.set(true);

    this.contentBlockService
      .getBlocks( environment.apiUrl+this.url())
      .subscribe({

        next: (data) => {

          this.blocks.set(
            [...data].sort(
              (a, b) =>
                a.sortOrder - b.sortOrder
            ) as ContentBlock[]
          );

          this.loading.set(false);

        },

        error: (error) => {

          console.error(
            'Failed to load content blocks:',
            error
          );

          this.loading.set(false);

        }

      });

  }

  openAddBlock(): void {
    this.showAddBlock.set(true);
  }

  closeAddBlock(): void {
    this.showAddBlock.set(false);
  }

  createBlock(
    block: ContentBlock
  ): void {

    const newBlock: ContentBlock = {
      ...block,
      sortOrder: this.blocks().length
    };

    this.contentBlockService
      .createBlock(
       environment.apiUrl+ this.url(),
        newBlock
      )
      .subscribe({

        next: (createdBlock) => {

          this.blocks.update(
            blocks => [
              ...blocks,
              createdBlock as ContentBlock
            ]
          );

          this.closeAddBlock();

        },

        error: (error) => {

          console.error(
            'Failed to create content block:',
            error
          );

        }

      });

  }

  openEditBlock(
    block: ContentBlock
  ): void {

    this.editingBlock.set(block);

  }

  closeEditBlock(): void {

    this.editingBlock.set(null);

  }

  updateBlock(
    block: ContentBlock
  ): void {

    if (!block.id) {

      console.error(
        'Cannot update content block without an id'
      );

      return;
    }

    this.contentBlockService
      .updateBlock(
       environment.apiUrl+ this.url(),
        block.id,
        block
      )
      .subscribe({

        next: (updatedBlock) => {

          this.blocks.update(
            blocks =>
              blocks.map(
                item =>
                  item.id === updatedBlock.id
                    ? updatedBlock as ContentBlock
                    : item
              )
          );

          this.closeEditBlock();

        },

        error: (error) => {

          console.error(
            'Failed to update content block:',
            error
          );

        }

      });

  }

  deleteBlock(
    block: ContentBlock
  ): void {

    if (!block.id) {

      console.error(
        'Cannot delete content block without an id'
      );

      return;
    }

    this.contentBlockService
      .deleteBlock(
       environment.apiUrl+ this.url(),
        block.id
      )
      .subscribe({

        next: () => {

          this.blocks.update(
            blocks =>
              blocks.filter(
                item =>
                  item.id !== block.id
              )
          );

        },

        error: (error) => {

          console.error(
            'Failed to delete content block:',
            error
          );

        }

      });

  }

}
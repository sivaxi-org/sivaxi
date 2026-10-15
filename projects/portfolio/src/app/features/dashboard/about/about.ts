import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { ContentBlockManager } from '../../../shared/components/content-block-manager/content-block-manager';
import { AboutService, AboutDto } from './about.service';


@Component({
  selector: 'app-about',
  imports: [
    ContentBlockManager
  ],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {

  private readonly aboutService =
    inject(AboutService);

  about =
    signal<AboutDto | null>(null);

  ngOnInit(): void {
    this.loadAbout();
  }

  loadAbout(): void {

    this.aboutService
      .getAbout()
      .subscribe({

        next: (data) => {

          console.log(
            'About:',
            data
          );

          this.about.set(data);

        },

        error: (error) => {

          console.error(
            'Failed to load about:',
            error
          );

        }

      });

  }

  updateField<K extends keyof AboutDto>(
    field: K,
    value: AboutDto[K]
  ): void {

    this.about.update(
      current => {

        if (!current) {
          return current;
        }

        return {
          ...current,
          [field]: value
        };

      }
    );

  }

  saveAbout(): void {

    const current =
      this.about();

    if (!current) {
      return;
    }

    this.aboutService
      .updateAbout(current)
      .subscribe({

        next: (data) => {

          console.log(
            'About updated:',
            data
          );

          this.about.set(data);

        },

        error: (error) => {

          console.error(
            'Failed to update about:',
            error
          );

        }

      });

  }

  deleteAbout(): void {

    this.aboutService
      .deleteAbout()
      .subscribe({

        next: () => {

          this.about.set(null);

        },

        error: (error) => {

          console.error(
            'Failed to delete about:',
            error
          );

        }

      });

  }

}
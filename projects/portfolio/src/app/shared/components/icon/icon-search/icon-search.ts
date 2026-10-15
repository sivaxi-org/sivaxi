import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  output,
  signal
} from '@angular/core';

import {
  Subject,
  merge,
  EMPTY
} from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  catchError,
  finalize,
  takeUntil,
  tap
} from 'rxjs/operators';
import { IconItem, IconService, normalizeIconSvg } from '../icon-service';



export interface IconSelection {
  name: string;
  icon: string;   // library id, e.g. "mdi:home"
  svg: string;    // normalized SVG markup - this is what you store
}

@Component({
  selector: 'app-icon-search',
  standalone: true,

  imports: [],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './icon-search.html'
})
export class IconSearch implements OnDestroy {

  // Emits once an icon is picked and its SVG has finished loading
  iconSelected = output<IconSelection>();

  searchText = signal('');

  icons = signal<IconItem[]>([]);

  loading = signal(false);
  errorMessage = signal('');

  // True while fetching the full SVG for whichever icon was just clicked
  svgLoading = signal(false);
  svgError = signal('');

  private typed$ = new Subject<string>();
  private manual$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  private cache = new Map<string, IconItem[]>();


  constructor(
    private iconService: IconService
  ) {

    merge(
      this.typed$.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ),
      this.manual$
    )
      .pipe(

        filter(query => {

          if (query.length < 2) {

            this.icons.set([]);
            this.loading.set(false);
            this.errorMessage.set('');

            return false;

          }

          return true;

        }),

        switchMap(query => {

          const cached = this.cache.get(query);

          if (cached) {

            this.icons.set(cached);
            this.loading.set(false);
            this.errorMessage.set('');

            return EMPTY;

          }

          this.loading.set(true);
          this.errorMessage.set('');

          return this.iconService.searchIcons(query).pipe(

            tap(result => {

              this.cache.set(query, result);
              this.icons.set(result);

            }),

            catchError(error => {

              console.error('Icon search error:', error);

              this.icons.set([]);
              this.errorMessage.set(
                'Something went wrong while searching. Please try again.'
              );

              return EMPTY;

            }),

            finalize(() => {

              this.loading.set(false);

            })

          );

        }),

        takeUntil(this.destroy$)

      )
      .subscribe();

  }


  onSearchInput(event: Event): void {

    const value = (event.target as HTMLInputElement).value;

    this.searchText.set(value);

    const query = value.trim().toLowerCase();

    if (!query) {

      this.icons.set([]);
      this.loading.set(false);
      this.errorMessage.set('');

    }

    this.typed$.next(query);

  }


  search(): void {

    const query = this.searchText().trim().toLowerCase();

    this.manual$.next(query);

  }


  /**
   * Fetches the real SVG markup for the clicked icon, normalizes it,
   * then emits it. Search results only carry the icon id - the SVG
   * itself is only fetched for the one icon actually picked.
   */
  selectIcon(icon: IconItem): void {

    if (this.svgLoading()) {
      return;
    }

    this.svgLoading.set(true);
    this.svgError.set('');

    this.iconService.getIconSvg(icon.icon)
      .pipe(takeUntil(this.destroy$))
      .subscribe({

        next: rawSvg => {

          const svg = normalizeIconSvg(rawSvg);

          this.svgLoading.set(false);

          this.iconSelected.emit({
            name: icon.name,
            icon: icon.icon,
            svg
          });

        },

        error: error => {

          console.error('Failed to load icon SVG:', error);

          this.svgLoading.set(false);
          this.svgError.set('Could not load this icon. Please try another.');

        }

      });

  }


  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();

    this.typed$.complete();
    this.manual$.complete();

  }

}
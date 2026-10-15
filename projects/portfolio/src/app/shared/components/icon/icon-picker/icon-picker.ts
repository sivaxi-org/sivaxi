import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  forwardRef,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconSearch, IconSelection } from '../icon-search/icon-search';
import { IconRenderer } from '../icon-renderer/icon-renderer';
import { IconUpload } from '../icon-upload/icon-upload';

type PickerTab = 'library' | 'custom';

@Component({
  selector: 'app-icon-picker',
  standalone: true,

  imports: [
    IconRenderer,
    IconSearch,
    IconUpload
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconPicker),
      multi: true
    }
  ],

  templateUrl: './icon-picker.html'
})
export class IconPicker implements ControlValueAccessor {

  dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  activeTab = signal<PickerTab>('library');

  value = signal<string | null>(null);

  disabled = signal(false);

  icon = input<string | null>(null);

  iconChange = output<string | null>();

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      this.value.set(this.icon() ?? null);
    });
  }

  openPicker(): void {
    if (this.disabled()) {
      return;
    }

    this.activeTab.set('library');
    this.dialog().nativeElement.showModal();
  }

  closePicker(): void {
    this.dialog().nativeElement.close();
    this.onTouched();
  }

  setTab(tab: PickerTab): void {
    this.activeTab.set(tab);
  }

  onLibraryIconSelected(selection: IconSelection): void {
    this.applySelection(selection.svg);
  }

  onCustomSvgSelected(svg: string): void {
    this.applySelection(svg);
  }

  private applySelection(svg: string): void {
    this.value.set(svg);

    this.onChange(svg);
    this.iconChange.emit(svg);

    this.closePicker();
  }

  clearSelection(event: Event): void {
    event.stopPropagation();

    this.value.set(null);

    this.onChange(null);
    this.iconChange.emit(null);
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? null);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
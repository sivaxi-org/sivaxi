import {
  ChangeDetectionStrategy,
  Component,
  computed,
  output,
  signal
} from '@angular/core';

import { IconRenderer } from '../icon-renderer/icon-renderer';
import { sanitizeAndNormalizeCustomSvg } from '../icon-service';

const MAX_SVG_BYTES = 100 * 1024; // 100KB

@Component({
  selector: 'app-icon-upload',
  standalone: true,

  imports: [
    IconRenderer
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './icon-upload.html'
})
export class IconUpload {

  svgSelected = output<string>();

  rawInput = signal('');
  error = signal('');

  // Sanitized + normalized version of whatever is currently in rawInput,
  // or null while it isn't valid SVG yet.
  preview = computed(() => {

    const raw = this.rawInput().trim();

    if (!raw) {
      return null;
    }

    return sanitizeAndNormalizeCustomSvg(raw);

  });


  onPaste(event: Event): void {

    const value = (event.target as HTMLTextAreaElement).value;

    this.rawInput.set(value);
    this.error.set('');

    if (value.trim() && !this.preview()) {
      this.error.set("That doesn't look like a valid SVG.");
    }

  }

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.error.set('');

    if (file.size > MAX_SVG_BYTES) {
      this.error.set('File is too large (max 100KB).');
      input.value = '';
      return;
    }

    const looksLikeSvg =
      file.name.toLowerCase().endsWith('.svg') ||
      file.type === 'image/svg+xml';

    if (!looksLikeSvg) {
      this.error.set('Please choose an .svg file.');
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {

      const text = reader.result as string;

      this.rawInput.set(text);

      if (!sanitizeAndNormalizeCustomSvg(text)) {
        this.error.set("That file doesn't look like a valid SVG.");
      }

    };

    reader.onerror = () => {
      this.error.set('Could not read that file.');
    };

    reader.readAsText(file);

    // allow re-selecting the same file later
    input.value = '';

  }

  useIcon(): void {

    const svg = this.preview();

    if (!svg) {
      return;
    }

    this.svgSelected.emit(svg);

  }

  clear(): void {

    this.rawInput.set('');
    this.error.set('');

  }

}

import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  signal,
} from '@angular/core';
import { IconRenderer } from '../../../shared/components/icon/icon-renderer/icon-renderer';

@Component({
  selector: 'app-contact',
  imports: [IconRenderer],
  styleUrl: './contact.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './contact.html',
})
export class Contact {
  readonly contactsData = input<any | undefined>(undefined);

  readonly copiedContact = signal<string | null>(null);

  sendMessage(data: any) {}

  async copyContact(link: string): Promise<void> {
    const value = link.replace(/^(mailto:|tel:)/i, '');

    try {
      await navigator.clipboard.writeText(value);

      this.copiedContact.set(link);

      setTimeout(() => {
        if (this.copiedContact() === link) {
          this.copiedContact.set(null);
        }
      }, 1500);
    } catch {
      // Clipboard access may be unavailable in insecure contexts.
    }
  }
}
import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
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

  sendMessage(data: any) {}

  async copyContact(link: string): Promise<void> {
    const value = link.replace(/^(mailto:|tel:)/i, '');

    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard access may be unavailable in insecure contexts.
      // The visible contact link remains selectable and usable.
    }
  }
}

import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';
import { ContactDto } from '../../../features/dashboard/contact/contact-service';
import { ProfileResponse } from '../../../features/dashboard/portfolio/portfolio-service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Footer {
  readonly portfolioData = input<ProfileResponse | undefined>();
  readonly contacts = input<ContactDto[]>([]);

  readonly currentYear = new Date().getFullYear();
  readonly copiedContactId = signal<string | number | null>(null);

  async copyContact(contact: ContactDto): Promise<void> {
    try {
      await navigator.clipboard.writeText(contact.link);
      this.copiedContactId.set(contact.id);

      setTimeout(() => {
        if (this.copiedContactId() === contact.id) {
          this.copiedContactId.set(null);
        }
      }, 1500);
    } catch (error) {
      console.error('Failed to copy contact:', error);
    }
  }
}
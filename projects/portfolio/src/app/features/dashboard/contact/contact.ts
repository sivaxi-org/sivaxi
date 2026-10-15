import {
Component,
OnInit,
inject,
signal
} from '@angular/core';

import {
ContactDto,
ContactService
} from './contact-service';

import { ContactForm } from './contact-form/contact-form';
import { IconRenderer } from '../../../shared/components/icon/icon-renderer/icon-renderer';

@Component({
selector: 'app-contact',
standalone: true,
imports: [ContactForm, IconRenderer],
templateUrl: './contact.html',
styleUrl: './contact.css'
})
export class Contact implements OnInit {

private readonly contactService = inject(ContactService);

contacts = signal<ContactDto[]>([]);

loading = signal(false);

showAddContact = signal(false);

editingContact = signal<ContactDto | null>(null);

ngOnInit(): void {
this.loadContacts();
}

loadContacts(): void {
this.loading.set(true);


this.contactService.getContacts(false).subscribe({
  next: contacts => {
    this.contacts.set(
      [...contacts].sort(
        (a, b) => a.sortOrder - b.sortOrder
      )
    );

    this.loading.set(false);
  },

  error: error => {
    console.error(
      'Failed to load contacts',
      error
    );

    this.loading.set(false);
  }
});


}

openAddContact(): void {
this.editingContact.set(null);
this.showAddContact.set(true);
}

closeAddContact(): void {
this.showAddContact.set(false);
}

createContact(contact: ContactDto): void {


const newContact: ContactDto = {
  ...contact,
  id: ''
};

this.contactService
  .createContact(newContact)
  .subscribe({
    next: created => {

      this.contacts.update(
        contacts =>
          [...contacts, created].sort(
            (a, b) =>
              a.sortOrder - b.sortOrder
          )
      );

      this.showAddContact.set(false);
    },

    error: error => {
      console.error(
        'Failed to create contact',
        error
      );
    }
  });


}

openEditContact(contact: ContactDto): void {
this.showAddContact.set(false);
this.editingContact.set(contact);
}

closeEditContact(): void {
this.editingContact.set(null);
}

updateContact(contact: ContactDto): void {


if (!contact.id) {
  return;
}

this.contactService
  .updateContact(
    contact.id,
    contact
  )
  .subscribe({
    next: updated => {

      this.contacts.update(
        contacts =>
          contacts
            .map(existing =>
              existing.id === updated.id
                ? updated
                : existing
            )
            .sort(
              (a, b) =>
                a.sortOrder - b.sortOrder
            )
      );

      this.editingContact.set(null);
    },

    error: error => {
      console.error(
        'Failed to update contact',
        error
      );
    }
  });


}

deleteContact(contact: ContactDto): void {


if (!contact.id) {
  return;
}

const confirmed = window.confirm(
  `Delete "${contact.title}" contact?`
);

if (!confirmed) {
  return;
}

this.contactService
  .deleteContact(contact.id)
  .subscribe({
    next: () => {

      this.contacts.update(
        contacts =>
          contacts.filter(
            existing =>
              existing.id !== contact.id
          )
      );

      const editing =
        this.editingContact();

      if (
        editing?.id === contact.id
      ) {
        this.editingContact.set(null);
      }
    },

    error: error => {
      console.error(
        'Failed to delete contact',
        error
      );
    }
  });


}
}

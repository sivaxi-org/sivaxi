
import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';

import { ContactDto } from '../contact-service';
import { IconSearch } from '../../../../shared/components/icon/icon-search/icon-search';
import { IconPicker } from '../../../../shared/components/icon/icon-picker/icon-picker';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ IconPicker],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm {

  contact = input<ContactDto | null>(null);

  cancelled = output<void>();
  submitted = output<ContactDto>();

  icon = signal('');
  type = signal('');
  title = signal('');
  link = signal('');
  sortOrder = signal(0);
  visible = signal(true);

  constructor() {
    effect(() => {
      const contact = this.contact();

      if (!contact) {
        this.icon.set('');
        this.type.set('');
        this.title.set('');
        this.link.set('');
        this.sortOrder.set(0);
        this.visible.set(true);
        return;
      }

      this.icon.set(contact.icon ?? '');
      this.type.set(contact.type);
      this.title.set(contact.title);
      this.link.set(contact.link);
      this.sortOrder.set(contact.sortOrder);
      this.visible.set(contact.visible);
    });
  }

  get editMode(): boolean {
    return this.contact() !== null;
  }

  submit(): void {
    const type = this.type().trim();
    const title = this.title().trim();
    const link = this.link().trim();

    if (!type || !title || !link) {
      return;
    }

    this.submitted.emit({
      id: this.contact()?.id ?? '',
      icon: this.icon().trim(),
      type,
      title,
      link,
      sortOrder: this.contact()?.sortOrder ?? this.sortOrder(),
      visible: this.visible()
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}


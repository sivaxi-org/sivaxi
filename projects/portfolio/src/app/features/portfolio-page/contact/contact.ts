import { Component, input } from '@angular/core';
import { IconRenderer } from '../../../shared/components/icon/icon-renderer/icon-renderer';


@Component({
  selector: 'app-contact',
  imports: [IconRenderer],
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
  readonly contactsData =
    input<any | undefined>(undefined);
}
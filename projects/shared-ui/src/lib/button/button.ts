
import { Component, input } from '@angular/core';

export type SivaxiButtonVariant = 'primary' | 'secondary' | 'danger';

@Component({
  selector: 'sivaxi-button',
  standalone: true,
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  readonly variant = input<SivaxiButtonVariant>('primary');
  readonly disabled = input(false);
}
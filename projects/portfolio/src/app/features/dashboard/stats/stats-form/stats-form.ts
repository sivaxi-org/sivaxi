
import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';

import { StatsDto } from '../stats-service';

@Component({
  selector: 'app-stats-form',
  standalone: true,
  imports: [],
  templateUrl: './stats-form.html',
  styleUrl: './stats-form.css'
})
export class StatsForm {

  stat = input<StatsDto | null>(null);

  cancelled = output<void>();
  submitted = output<StatsDto>();

  label = signal('');
  value = signal('');
  icon = signal('');
  sortOrder = signal(0);
  visible = signal(true);

  constructor() {
    effect(() => {
      const stat = this.stat();

      if (!stat) {
        this.label.set('');
        this.value.set('');
        this.icon.set('');
        this.sortOrder.set(0);
        this.visible.set(true);
        return;
      }

      this.label.set(stat.label);
      this.value.set(stat.value);
      this.icon.set(stat.icon ?? '');
      this.sortOrder.set(stat.sortOrder);
      this.visible.set(stat.visible);
    });
  }

  get editMode(): boolean {
    return this.stat() !== null;
  }

  submit(): void {
    const label = this.label().trim();
    const value = this.value().trim();

    if (!label || !value) {
      return;
    }

    this.submitted.emit({
      uid: this.stat()?.uid ?? '',
      label,
      value,
      icon: this.icon().trim(),
      sortOrder: this.stat()?.sortOrder ?? this.sortOrder(),
      visible: this.visible()
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}



import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';

import { SkillDto } from '../skill-service';
import { IconPicker } from '../../../../shared/components/icon/icon-picker/icon-picker';

@Component({
  selector: 'app-skill-form',
  standalone: true,
  imports: [IconPicker],
  templateUrl: './skill-form.html',
  styleUrl: './skill-form.css'
})
export class SkillForm {

  skill = input<SkillDto | null>(null);

  cancelled = output<void>();
  submitted = output<SkillDto>();

  name = signal('');
  icon = signal('');
  proficiency = signal(0);
  sortOrder = signal(0);
  visible = signal(true);

  constructor() {
    effect(() => {
      const skill = this.skill();

      if (!skill) {
        this.name.set('');
        this.icon.set('');
        this.proficiency.set(0);
        this.sortOrder.set(0);
        this.visible.set(true);
        return;
      }

      this.name.set(skill.name);
      this.icon.set(skill.icon ?? '');
      this.proficiency.set(skill.proficiency);
      this.sortOrder.set(skill.sortOrder);
      this.visible.set(skill.visible);
    });
  }

  get editMode(): boolean {
    return this.skill() !== null;
  }

  submit(): void {
    const name = this.name().trim();

    if (!name) {
      return;
    }

    const proficiency = Math.min(
      100,
      Math.max(0, this.proficiency())
    );

    this.submitted.emit({
      id: this.skill()?.id ?? '',
      name,
      icon: this.icon().trim() || null,
      proficiency,
      sortOrder: this.skill()?.sortOrder ?? this.sortOrder(),
      visible: this.visible()
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}


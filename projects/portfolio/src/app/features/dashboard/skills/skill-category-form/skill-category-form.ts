
import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';
import {
  SkillCategoryDto
} from '../skill-service';
import { IconPicker } from '../../../../shared/components/icon/icon-picker/icon-picker';

@Component({
  selector: 'app-skill-category-form',
  standalone: true,
  imports: [IconPicker],
  templateUrl: './skill-category-form.html',
  styleUrl: './skill-category-form.css'
})
export class SkillCategoryForm {

  category = input<SkillCategoryDto | null>(null);

  cancelled = output<void>();
  submitted = output<SkillCategoryDto>();

  name = signal('');
  description = signal('');
  icon = signal('');
  sortOrder = signal(0);
  visible = signal(true);

  constructor() {
    effect(() => {
      const category = this.category();

      if (!category) {
        this.name.set('');
        this.description.set('');
        this.icon.set('');
        this.sortOrder.set(0);
        this.visible.set(true);
        return;
      }

      this.name.set(category.name);
      this.description.set(category.description ?? '');
      this.icon.set(category.icon ?? '');
      this.sortOrder.set(category.sortOrder);
      this.visible.set(category.visible);
    });
  }

  get editMode(): boolean {
    return this.category() !== null;
  }

  submit(): void {
    const name = this.name().trim();

    if (!name) {
      return;
    }

    this.submitted.emit({
      id: this.category()?.id ?? '',
      name,
      description: this.description().trim() || null,
      icon: this.icon().trim() || null,
      sortOrder: this.category()?.sortOrder ?? this.sortOrder(),
      visible: this.visible()
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}


import {
  Component,
  effect,
  input,
  output,
  signal
} from '@angular/core';

import {
  ContentBlockDto,
  SkillsBlockData
} from '../../content-block/content-block.model';

@Component({
  selector: 'app-skills-block-form',
  imports: [],
  templateUrl: './skills-block-form.html',
  styleUrl: './skills-block-form.css'
})
export class SkillsBlockForm {

  data = input<ContentBlockDto<'SKILLS'> | null>(null);

  readonly cancelled =
    output<void>();

  readonly submitted =
    output<ContentBlockDto<'SKILLS'>>();

  title =
    signal('');

  skills =
    signal<string[]>([]);

  newSkill =
    signal('');

  constructor() {

    effect(() => {

      const block = this.data();

      if (block) {

        this.title.set(
          block.data.title
        );

        this.skills.set(
          [...block.data.skills]
        );

      }

    });

  }

  updateTitle(
    value: string
  ): void {

    this.title.set(value);

  }

  updateNewSkill(
    value: string
  ): void {

    this.newSkill.set(value);

  }

  addSkill(): void {

    const skill =
      this.newSkill().trim();

    if (!skill) {
      return;
    }

    this.skills.update(
      skills => [
        ...skills,
        skill
      ]
    );

    this.newSkill.set('');

  }

  removeSkill(
    index: number
  ): void {

    this.skills.update(
      skills =>
        skills.filter(
          (_, i) => i !== index
        )
    );

  }

  cancel(): void {

    this.cancelled.emit();

  }

  submit(): void {

    const data: SkillsBlockData = {

      title: this.title(),

      skills: this.skills()

    };

    const block: ContentBlockDto<'SKILLS'> = {

      id: this.data()?.id,

      blockType: 'SKILLS',

      data,

      sortOrder:
        this.data()?.sortOrder ?? 0

    };

    this.submitted.emit(block);

  }

}
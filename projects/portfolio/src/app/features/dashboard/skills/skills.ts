
import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  SkillCategoryDto,
  SkillDto,
  SkillService
} from './skill-service';

import { SkillCategoryForm } from './skill-category-form/skill-category-form';
import { SkillForm } from './skill-form/skill-form';
import { IconRenderer } from '../../../shared/components/icon/icon-renderer/icon-renderer';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    SkillCategoryForm,
    SkillForm,
    IconRenderer
],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements OnInit {

  private readonly skillService = inject(SkillService);

  categories = signal<SkillCategoryDto[]>([]);

  /**
   * Skills grouped by category id.
   */
  skillsByCategory = signal<Record<string, SkillDto[]>>({});

  loading = signal(false);

  showAddCategory = signal(false);
  editingCategory = signal<SkillCategoryDto | null>(null);

  /**
   * Category id for which the Add Skill form is currently open.
   */
  addingSkillToCategory = signal<string | null>(null);

  /**
   * Skill currently being edited.
   */
  editingSkill = signal<{
    categoryId: string;
    skill: SkillDto;
  } | null>(null);

  ngOnInit(): void {
    this.loadCategories();
  }

  // --------------------------------------------------
  // Categories
  // --------------------------------------------------

  loadCategories(): void {
    this.loading.set(true);

    this.skillService.getCategories(false).subscribe({
      next: categories => {
        const sortedCategories = [...categories].sort(
          (a, b) => a.sortOrder - b.sortOrder
        );

        this.categories.set(sortedCategories);

        this.loadSkillsForCategories(sortedCategories);
      },

      error: error => {
        console.error(
          'Failed to load skill categories',
          error
        );

        this.loading.set(false);
      }
    });
  }

  private loadSkillsForCategories(
    categories: SkillCategoryDto[]
  ): void {

    if (categories.length === 0) {
      this.skillsByCategory.set({});
      this.loading.set(false);
      return;
    }

    let completed = 0;

    const skills: Record<string, SkillDto[]> = {};

    for (const category of categories) {

      this.skillService
        .getSkills(category.id, false)
        .subscribe({
          next: categorySkills => {

            skills[category.id] = [...categorySkills].sort(
              (a, b) => a.sortOrder - b.sortOrder
            );

            completed++;

            if (completed === categories.length) {
              this.skillsByCategory.set(skills);
              this.loading.set(false);
            }
          },

          error: error => {
            console.error(
              `Failed to load skills for category ${category.id}`,
              error
            );

            skills[category.id] = [];

            completed++;

            if (completed === categories.length) {
              this.skillsByCategory.set(skills);
              this.loading.set(false);
            }
          }
        });
    }
  }

  getSkillsForCategory(
    categoryId: string
  ): SkillDto[] {
    return this.skillsByCategory()[categoryId] ?? [];
  }

  openAddCategory(): void {
    this.editingCategory.set(null);
    this.showAddCategory.set(true);
  }

  closeAddCategory(): void {
    this.showAddCategory.set(false);
  }

  createCategory(category: SkillCategoryDto): void {

    const newCategory: SkillCategoryDto = {
      ...category,
      id: '',
      sortOrder: this.categories().length
    };

    this.skillService
      .createCategory(newCategory)
      .subscribe({
        next: created => {

          this.categories.update(categories =>
            [...categories, created].sort(
              (a, b) => a.sortOrder - b.sortOrder
            )
          );

          this.skillsByCategory.update(skills => ({
            ...skills,
            [created.id]: []
          }));

          this.showAddCategory.set(false);
        },

        error: error => {
          console.error(
            'Failed to create skill category',
            error
          );
        }
      });
  }

  openEditCategory(
    category: SkillCategoryDto
  ): void {
    this.showAddCategory.set(false);
    this.editingCategory.set(category);
  }

  closeEditCategory(): void {
    this.editingCategory.set(null);
  }

  updateCategory(
    category: SkillCategoryDto
  ): void {

    if (!category.id) {
      return;
    }

    this.skillService
      .updateCategory(category.id, category)
      .subscribe({
        next: updated => {

          this.categories.update(categories =>
            categories
              .map(category =>
                category.id === updated.id
                  ? updated
                  : category
              )
              .sort(
                (a, b) => a.sortOrder - b.sortOrder
              )
          );

          this.editingCategory.set(null);
        },

        error: error => {
          console.error(
            'Failed to update skill category',
            error
          );
        }
      });
  }

  deleteCategory(
    category: SkillCategoryDto
  ): void {

    if (!category.id) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${category.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.skillService
      .deleteCategory(category.id)
      .subscribe({
        next: () => {

          this.categories.update(categories =>
            categories.filter(
              item => item.id !== category.id
            )
          );

          this.skillsByCategory.update(skills => {

            const updated = {
              ...skills
            };

            delete updated[category.id];

            return updated;
          });
        },

        error: error => {
          console.error(
            'Failed to delete skill category',
            error
          );
        }
      });
  }

  // --------------------------------------------------
  // Skills
  // --------------------------------------------------

  openAddSkill(categoryId: string): void {
    this.editingSkill.set(null);
    this.addingSkillToCategory.set(categoryId);
  }

  closeAddSkill(): void {
    this.addingSkillToCategory.set(null);
  }

  createSkill(
    categoryId: string,
    skill: SkillDto
  ): void {

    const newSkill: SkillDto = {
      ...skill,
      id: '',
      sortOrder: this.getSkillsForCategory(categoryId).length
    };

    this.skillService
      .createSkill(categoryId, newSkill)
      .subscribe({
        next: created => {

          this.skillsByCategory.update(skills => ({
            ...skills,
            [categoryId]: [
              ...(skills[categoryId] ?? []),
              created
            ].sort(
              (a, b) => a.sortOrder - b.sortOrder
            )
          }));

          this.addingSkillToCategory.set(null);
        },

        error: error => {
          console.error(
            'Failed to create skill',
            error
          );
        }
      });
  }

  openEditSkill(
    categoryId: string,
    skill: SkillDto
  ): void {

    this.addingSkillToCategory.set(null);

    this.editingSkill.set({
      categoryId,
      skill
    });
  }

  closeEditSkill(): void {
    this.editingSkill.set(null);
  }

  updateSkill(
    categoryId: string,
    skill: SkillDto
  ): void {

    if (!skill.id) {
      return;
    }

    this.skillService
      .updateSkill(
        categoryId,
        skill.id,
        skill
      )
      .subscribe({
        next: updated => {

          this.skillsByCategory.update(skills => ({
            ...skills,
            [categoryId]: (skills[categoryId] ?? [])
              .map(existing =>
                existing.id === updated.id
                  ? updated
                  : existing
              )
              .sort(
                (a, b) => a.sortOrder - b.sortOrder
              )
          }));

          this.editingSkill.set(null);
        },

        error: error => {
          console.error(
            'Failed to update skill',
            error
          );
        }
      });
  }

  deleteSkill(
    categoryId: string,
    skill: SkillDto
  ): void {

    if (!skill.id) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${skill.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.skillService
      .deleteSkill(
        categoryId,
        skill.id
      )
      .subscribe({
        next: () => {

          this.skillsByCategory.update(skills => ({
            ...skills,
            [categoryId]: (skills[categoryId] ?? [])
              .filter(
                existing => existing.id !== skill.id
              )
          }));

          const editing = this.editingSkill();

          if (editing?.skill.id === skill.id) {
            this.editingSkill.set(null);
          }
        },

        error: error => {
          console.error(
            'Failed to delete skill',
            error
          );
        }
      });
  }
}


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillCategoryForm } from './skill-category-form';

describe('SkillCategoryForm', () => {
  let component: SkillCategoryForm;
  let fixture: ComponentFixture<SkillCategoryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillCategoryForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillCategoryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

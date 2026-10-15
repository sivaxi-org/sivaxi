import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsBlockForm } from './skills-block-form';

describe('SkillsBlockForm', () => {
  let component: SkillsBlockForm;
  let fixture: ComponentFixture<SkillsBlockForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsBlockForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsBlockForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

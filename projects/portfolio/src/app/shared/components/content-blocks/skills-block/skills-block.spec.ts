import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsBlock } from './skills-block';

describe('SkillsBlock', () => {
  let component: SkillsBlock;
  let fixture: ComponentFixture<SkillsBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsBlock],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsBlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

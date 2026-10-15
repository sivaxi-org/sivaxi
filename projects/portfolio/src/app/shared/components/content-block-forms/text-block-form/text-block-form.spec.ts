import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextBlockForm } from './text-block-form';

describe('TextBlockForm', () => {
  let component: TextBlockForm;
  let fixture: ComponentFixture<TextBlockForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextBlockForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TextBlockForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

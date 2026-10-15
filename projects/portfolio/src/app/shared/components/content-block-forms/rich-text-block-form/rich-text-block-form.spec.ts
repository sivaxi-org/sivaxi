import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RichTextBlockForm } from './rich-text-block-form';

describe('RichTextBlockForm', () => {
  let component: RichTextBlockForm;
  let fixture: ComponentFixture<RichTextBlockForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTextBlockForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RichTextBlockForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadingBlockForm } from './heading-block-form';

describe('HeadingBlockForm', () => {
  let component: HeadingBlockForm;
  let fixture: ComponentFixture<HeadingBlockForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadingBlockForm],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadingBlockForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

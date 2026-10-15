import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageBlockForm } from './image-block-form';

describe('ImageBlockForm', () => {
  let component: ImageBlockForm;
  let fixture: ComponentFixture<ImageBlockForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageBlockForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageBlockForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomBlockForm } from './custom-block-form';

describe('CustomBlockForm', () => {
  let component: CustomBlockForm;
  let fixture: ComponentFixture<CustomBlockForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomBlockForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomBlockForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleBulletsBlockForm } from './title-bullets-block-form';

describe('TitleBulletsBlockForm', () => {
  let component: TitleBulletsBlockForm;
  let fixture: ComponentFixture<TitleBulletsBlockForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleBulletsBlockForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TitleBulletsBlockForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

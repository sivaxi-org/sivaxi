import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleBulletsBlock } from './title-bullets-block';

describe('TitleBulletsBlock', () => {
  let component: TitleBulletsBlock;
  let fixture: ComponentFixture<TitleBulletsBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleBulletsBlock],
    }).compileComponents();

    fixture = TestBed.createComponent(TitleBulletsBlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

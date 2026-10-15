import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RichTextBlock } from './rich-text-block';

describe('RichTextBlock', () => {
  let component: RichTextBlock;
  let fixture: ComponentFixture<RichTextBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTextBlock],
    }).compileComponents();

    fixture = TestBed.createComponent(RichTextBlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

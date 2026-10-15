import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentBlockRenderer } from './content-block-renderer';

describe('ContentBlockRenderer', () => {
  let component: ContentBlockRenderer;
  let fixture: ComponentFixture<ContentBlockRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentBlockRenderer],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentBlockRenderer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentBlockManager } from './content-block-manager';

describe('ContentBlockManager', () => {
  let component: ContentBlockManager;
  let fixture: ComponentFixture<ContentBlockManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentBlockManager],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentBlockManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

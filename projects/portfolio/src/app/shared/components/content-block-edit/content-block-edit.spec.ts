import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentBlockEdit } from './content-block-edit';

describe('ContentBlockEdit', () => {
  let component: ContentBlockEdit;
  let fixture: ComponentFixture<ContentBlockEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentBlockEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentBlockEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

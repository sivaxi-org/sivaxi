import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentBlockAdd } from './content-block-add';

describe('ContentBlockAdd', () => {
  let component: ContentBlockAdd;
  let fixture: ComponentFixture<ContentBlockAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentBlockAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentBlockAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

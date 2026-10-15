import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentBlockTest } from './content-block-test';

describe('ContentBlockTest', () => {
  let component: ContentBlockTest;
  let fixture: ComponentFixture<ContentBlockTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentBlockTest],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentBlockTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

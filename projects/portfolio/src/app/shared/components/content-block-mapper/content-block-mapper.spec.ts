import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentBlockMapper } from './content-block-mapper';

describe('ContentBlockMapper', () => {
  let component: ContentBlockMapper;
  let fixture: ComponentFixture<ContentBlockMapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentBlockMapper],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentBlockMapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconRenderer } from './icon-renderer';

describe('IconRenderer', () => {
  let component: IconRenderer;
  let fixture: ComponentFixture<IconRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconRenderer],
    }).compileComponents();

    fixture = TestBed.createComponent(IconRenderer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomBlock } from './custom-block';

describe('CustomBlock', () => {
  let component: CustomBlock;
  let fixture: ComponentFixture<CustomBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomBlock],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomBlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

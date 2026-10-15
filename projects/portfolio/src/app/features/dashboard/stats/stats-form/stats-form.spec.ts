import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsForm } from './stats-form';

describe('StatsForm', () => {
  let component: StatsForm;
  let fixture: ComponentFixture<StatsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsForm],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

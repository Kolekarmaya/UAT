import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusCalculatorComponent } from './bonus-calculator.component';

describe('BonusCalculatorComponent', () => {
  let component: BonusCalculatorComponent;
  let fixture: ComponentFixture<BonusCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutCalculatorComponent } from './payout-calculator.component';

describe('PayoutCalculatorComponent', () => {
  let component: PayoutCalculatorComponent;
  let fixture: ComponentFixture<PayoutCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

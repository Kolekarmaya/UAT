import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StampDutyDashboardComponent } from './stamp-duty-dashboard.component';

describe('StampDutyDashboardComponent', () => {
  let component: StampDutyDashboardComponent;
  let fixture: ComponentFixture<StampDutyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StampDutyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampDutyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

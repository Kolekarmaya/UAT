import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelistApprovalComponent } from './duelist-approval.component';

describe('DuelistApprovalComponent', () => {
  let component: DuelistApprovalComponent;
  let fixture: ComponentFixture<DuelistApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuelistApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuelistApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

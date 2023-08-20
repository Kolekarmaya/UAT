import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsPayoutComponent } from './groups-payout.component';

describe('GroupsPayoutComponent', () => {
  let component: GroupsPayoutComponent;
  let fixture: ComponentFixture<GroupsPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

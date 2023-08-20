import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UlipPrecheckingComponent } from './ulip-prechecking.component';

describe('UlipPrecheckingComponent', () => {
  let component: UlipPrecheckingComponent;
  let fixture: ComponentFixture<UlipPrecheckingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UlipPrecheckingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UlipPrecheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

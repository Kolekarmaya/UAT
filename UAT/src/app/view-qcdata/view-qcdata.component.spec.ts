import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQCDataComponent } from './view-qcdata.component';

describe('ViewQCDataComponent', () => {
  let component: ViewQCDataComponent;
  let fixture: ComponentFixture<ViewQCDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewQCDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQCDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

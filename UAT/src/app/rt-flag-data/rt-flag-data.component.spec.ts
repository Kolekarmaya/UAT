import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RTFlagDataComponent } from './rt-flag-data.component';

describe('RTFlagDataComponent', () => {
  let component: RTFlagDataComponent;
  let fixture: ComponentFixture<RTFlagDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RTFlagDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RTFlagDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

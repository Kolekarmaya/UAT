import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RTFlagComponent } from './rt-flag.component';

describe('RTFlagComponent', () => {
  let component: RTFlagComponent;
  let fixture: ComponentFixture<RTFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RTFlagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RTFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

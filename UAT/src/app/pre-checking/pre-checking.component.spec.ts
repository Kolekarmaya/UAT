import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCheckingComponent } from './pre-checking.component';

describe('PreCheckingComponent', () => {
  let component: PreCheckingComponent;
  let fixture: ComponentFixture<PreCheckingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreCheckingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreCheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

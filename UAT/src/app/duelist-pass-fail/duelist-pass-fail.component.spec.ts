import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelistPassFailComponent } from './duelist-pass-fail.component';

describe('DuelistPassFailComponent', () => {
  let component: DuelistPassFailComponent;
  let fixture: ComponentFixture<DuelistPassFailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuelistPassFailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuelistPassFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

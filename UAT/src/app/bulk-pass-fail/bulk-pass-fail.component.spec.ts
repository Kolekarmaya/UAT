import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkPassFailComponent } from './bulk-pass-fail.component';

describe('BulkPassFailComponent', () => {
  let component: BulkPassFailComponent;
  let fixture: ComponentFixture<BulkPassFailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkPassFailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkPassFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProcessedDataComponent } from './show-processed-data.component';

describe('ShowProcessedDataComponent', () => {
  let component: ShowProcessedDataComponent;
  let fixture: ComponentFixture<ShowProcessedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProcessedDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProcessedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

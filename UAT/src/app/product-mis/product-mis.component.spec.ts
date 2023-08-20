import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMisComponent } from './product-mis.component';

describe('ProductMisComponent', () => {
  let component: ProductMisComponent;
  let fixture: ComponentFixture<ProductMisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStockComponent } from './customer-stock.component';

describe('CustomerStockComponent', () => {
  let component: CustomerStockComponent;
  let fixture: ComponentFixture<CustomerStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

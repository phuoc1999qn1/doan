import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductElectronicComponent } from './product-electronic.component';

describe('ProductElectronicComponent', () => {
  let component: ProductElectronicComponent;
  let fixture: ComponentFixture<ProductElectronicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductElectronicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductElectronicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

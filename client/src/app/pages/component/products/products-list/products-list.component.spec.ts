import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { of } from 'rxjs';

import { ProductsListComponent } from './products-list.component';
import { ProductService } from 'src/app/services/products.services';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(() => {

    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    productServiceSpy.getProducts.and.returnValue(of(
      {
        ok: true,
        products : [
          {
              id: 1,
              code: "SA01",
              name: "Cuenta de Ahorro",
              description: "Es una cuenta bancaria diseñada para ayudarte a ahorrar dinero a largo plazo",
              logo: "",
              release_date: "2023-09-27T00:00:00.000Z",
              review_date: "2023-10-27T00:00:00.000Z",
              state: true
          },
          {
              id: 2,
              code: "TC02",
              name: "Tarjeta de Crédito",
              description: "Es una línea de crédito proporcionada por el banco que te permite realizar compras a crédito",
              logo: "",
              release_date: "2023-09-27T00:00:00.000Z",
              review_date: "2023-10-27T00:00:00.000Z",
              state: true
          },
        ]
      }
    ));

    productServiceSpy.deleteProduct.withArgs('2').and.returnValue(of(
      {
        ok: true,
        newProduct : 
        {
          id: 1,
          code: "SA01",
          name: "Cuenta de Ahorro",
          description: "Es una cuenta bancaria diseñada para ayudarte a ahorrar dinero a largo plazo",
          logo: "",
          release_date: "2023-09-27T00:00:00.000Z",
          review_date: "2023-10-27T00:00:00.000Z",
          state: false
        },
      }
    ));

    TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve data from the Products API', fakeAsync(inject([ProductService],
     (service: ProductService) => {
        let data: any;

        service.getProducts().subscribe(response => {
          data = response;
        });

        tick();

        expect(data.ok).toBe(true);
        expect(data.products.length).toBeGreaterThan(0);
      })
  ));

  it('should delete data from the Products API', fakeAsync(inject([ProductService],
    (service: ProductService) => {
       let data: any;

       service.deleteProduct('2').subscribe(response => {
         data = response;
       });

       tick();

       expect(data.ok).toBe(true);
       expect(data.newProduct.state).toBe(false);
     })
 ));

});

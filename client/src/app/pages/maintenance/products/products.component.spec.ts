import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { ProductsComponent } from './products.component';
import { ProductService } from 'src/app/services/products.services';
import { Product } from 'src/app/services/models'

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(() => {

    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProductById', 'postProduct', 'putProduct']);
    productServiceSpy.getProductById.withArgs('2').and.returnValue(of(
      {
        ok: true,
        newProduct: {
          id: 2,
          code: 'TC02',
          name: 'Tarjeta de Crédito',
          description: 'Es una línea de crédito proporcionada por el banco que te permite realizar compras a crédito',
          logo: '',
          release_date: '2023-09-27T00:00:00.000Z',
          review_date: '2023-10-27T00:00:00.000Z',
          state: true
        }
      }
    ));

    productServiceSpy.postProduct.and.returnValue(of({
      ok: true,
      newProduct: {
        code: 'PTA01',
        name: 'Producto test angular',
        description: 'Es una línea de crédito proporcionada por el banco que te permite realizar compras a crédito',
        logo: '',
        release_date: '2023-09-29',
        review_date: '2023-10-29',
        state: true
      }
    }));

    productServiceSpy.putProduct.and.returnValue(of({
      ok: true,
      newProduct: {
        code: 'PTA01',
        name: 'Producto test angular',
        description: 'Es una línea de crédito proporcionada por el banco que te permite realizar compras a crédito',
        logo: '',
        release_date: '2023-09-29',
        review_date: '2023-10-29',
        state: true
      }
    }));

    let activatedRoute: any = {
      snapshot: {
        params: { parametro: '2' },
      }
    };

    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('You must create a form with specific fields.', () => {

    expect(component.productForm.contains('code')).toBeTruthy();
    expect(component.productForm.contains('name')).toBeTruthy();
    expect(component.productForm.contains('description')).toBeTruthy();
    expect(component.productForm.contains('logo')).toBeTruthy();
    expect(component.productForm.contains('release_date')).toBeTruthy();

  });

  it('Validate form.', () => {

    const codeControl = component.productForm.get('code');
    codeControl?.setValue('');
    const nameControl = component.productForm.get('name');
    nameControl?.setValue('');
    const descriptionControl = component.productForm.get('description');
    descriptionControl?.setValue('');
    const logoControl = component.productForm.get('logo');
    logoControl?.setValue('');

    expect( codeControl?.valid ).toBeFalsy();
    expect( nameControl?.valid ).toBeFalsy();
    expect( descriptionControl?.valid ).toBeFalsy();
    expect( logoControl?.valid ).toBeFalsy();

  });

  it('Return date format.', () => {

    const dateNow = new Date();
    const dateFormat = component.formatDate(dateNow);
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

     expect(dateFormat).toMatch(dateFormatRegex);

  });

  it('Add one year to release date', () => {

    const event = {
      target: {
        value: '2023-09-29'
      }
    };
    const newDate = component.onReleaseDateChange(event);
    expect(newDate).toEqual(jasmine.stringMatching('2024'));

  });

  it('Set current day release date', () => {

    const newDate = component.getCurrentDate('release_date');
    expect(newDate).toEqual(jasmine.stringMatching('2023'));

  });

  it('Set current day review date', () => {
    
    const newDate = component.getCurrentDate('review_date');
    expect(newDate).toEqual(jasmine.stringMatching('2024'));

  });

  it('should retrieve data from the Product API by id', fakeAsync(inject([ProductService],
     (service: ProductService) => {
        let data: any;

        service.getProductById('2').subscribe(response => {
          data = response;
        });

        tick();

        expect(data.ok).toBe(true);
        expect(data.newProduct.code).toBe('TC02');
      })
  ));

  it('should create a new product', fakeAsync(inject([ProductService],
      (service: ProductService) => {
          let data: any;
          
          const product: Product = {
            code: 'PTA01',
            name: 'Producto test angular',
            description: 'Es una línea de crédito proporcionada por el banco que te permite realizar compras a crédito',
            logo: '',
            release_date: '2023-09-29',
            review_date: '2023-10-29',
            state: true
          };

          service.postProduct(product).subscribe(response => {
            data = response;
          });

          tick();

          expect(data.ok).toBe(true);
          expect(data.newProduct.code).toBe(product.code);
      })
    ));

    it('should update a product', fakeAsync(inject([ProductService],
      (service: ProductService) => {
          let data: any;
          
          const product: Product = {
            code: 'PTA01',
            name: 'Producto test angular',
            description: 'Es una línea de crédito proporcionada por el banco que te permite realizar compras a crédito',
            logo: '',
            release_date: '2023-09-29',
            review_date: '2023-10-29',
            state: true
          };

          service.putProduct(product).subscribe(response => {
            data = response;
          });

          tick();

          expect(data.ok).toBe(true);
          expect(data.newProduct.code).toBe(product.code);
      })
    ));
});

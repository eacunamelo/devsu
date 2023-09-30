import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Product } from 'src/app/services/models';
import { ProductService } from 'src/app/services/products.services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  productForm!: FormGroup;
  
  product : Product = {
    id: 0,
    code: '',
    name: '',
    description: '',
    logo: '',
    release_date: '',
    review_date: '',
    state: true
  }

  constructor(
    private fb: FormBuilder,
    private _productService : ProductService,
    private route: ActivatedRoute
    ) {
    this.createForm();
  }

  ngOnInit() {
    //@ts-ignore
    const productId : string = this.route.snapshot.params.parametro;
    if (productId != "" && productId != null) this.getProduct(productId);
  }

  getProduct( id : any ) {
    this._productService.getProductById(id).subscribe( resp => {
      if (resp.ok) {
        this.setValues( resp.newProduct );
      }
    })
  }

  setValues( data : Product ) {
    this.productForm.get('id')?.setValue(data.id);
    this.productForm.get('code')?.setValue(data.code);
    this.productForm.get('name')?.setValue(data.name);
    this.productForm.get('description')?.setValue(data.description);
    this.productForm.get('logo')?.setValue(data.logo);
    this.productForm.get('release_date')?.setValue(this.getCurrentDate(data.release_date));
    this.productForm.get('review_date')?.setValue(this.getCurrentDate(data.review_date));
  }

  createForm() {
    this.productForm = this.fb.group({
      id: [''],
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required, Validators.required]],
      release_date: [this.getCurrentDate('release_date'), [Validators.required]],
      review_date: [{ value: this.getCurrentDate('review_date'), disabled: true }],
    });
  }

  saveProduct() {
    if (this.productForm.invalid) {
      return Object.values(this.productForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    //@ts-ignore
    let product : Product = {};
    if (this.productForm.controls['id'].value > 0 && this.productForm.controls['id'].value != "") {
      product = {
        id : this.productForm.controls['id'].value,
        code: this.productForm.controls['code'].value,
        name: this.productForm.controls['name'].value,
        description: this.productForm.controls['description'].value,
        logo: this.productForm.controls['logo'].value,
        release_date: this.productForm.controls['release_date'].value,
        review_date: this.productForm.controls['review_date'].value,
        state: true
      }
    } else {
      product = {
        code: this.productForm.controls['code'].value,
        name: this.productForm.controls['name'].value,
        description: this.productForm.controls['description'].value,
        logo: this.productForm.controls['logo'].value,
        release_date: this.productForm.controls['release_date'].value,
        review_date: this.productForm.controls['review_date'].value,
        state: true
      }
    }
    
    if (product.id && product.id > 0) {
      this._productService.putProduct(product).subscribe( resp => {
        if (resp.ok) {
          console.log(resp);
        }
      })
    } else {
      console.log(product);
      
      this._productService.postProduct(product).subscribe( resp => {
        if (resp.ok) {
          console.log(resp);
        }
      })
    }
  }

  clean() {
    return Object.values(this.productForm.controls).forEach(control => {
      control.setValue('');
    });
  }

  onReleaseDateChange(event: any) {
    const releaseDate = new Date(event.target.value);
    releaseDate.setFullYear(releaseDate.getFullYear() + 1);
    const formattedReleaseDate = this.formatDate(releaseDate);
    this.productForm.get('review_date')?.setValue(formattedReleaseDate);
    return formattedReleaseDate;
  }

  getCurrentDate( data: any ): string {
    const currentDate = new Date();
    let year = 0;
    let month = '';
    let day = '';
    if (data == 'release_date') {
      year = currentDate.getFullYear();
      month = String(currentDate.getMonth() + 1).padStart(2, '0');
      day = String(currentDate.getDate()).padStart(2, '0');
    } else {
      year = currentDate.getFullYear() + 1;
      month = String(currentDate.getMonth() + 1).padStart(2, '0');
      day = String(currentDate.getDate()).padStart(2, '0');
    }
    return `${year}-${month}-${day}`;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}


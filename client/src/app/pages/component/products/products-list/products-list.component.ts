import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/services/models';
import { ProductService } from 'src/app/services/products.services';

import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {
  productSelected: any;

  products : Product[] = [{
    id: 0,
    code: '',
    name: '',
    description: '',
    logo: '',
    release_date: '',
    review_date: '',
    state: true
  }]

  productsOriginal : Product[] = [{
    id: 0,
    code: '',
    name: '',
    description: '',
    logo: '',
    release_date: '',
    review_date: '',
    state: true
  }]

  records = 0;

  valueSearch = "";

  showModal = false;

  constructor(
    private _productService : ProductService,
    private router: Router
  ) { }

  ngOnInit(): void{
    this.getProducts();
  }

  getProducts(){
    this._productService.getProducts().subscribe( resp => {
      if (resp.ok) {
        this.products = resp.products;
        this.records = resp.products.length;
        this.productsOriginal = [...this.products];
      }
    })
  }

  searchChange(){
    if (this.valueSearch.length > 3) {
      this.products = this.products.filter(product => product.name.includes(this.valueSearch) || product.description.includes(this.valueSearch));
    } else {
      this.products = this.productsOriginal;
    }
  }

  editProduct( data: Product ) {
    this.router.navigate([`/pages/products/maintenance/${data.id}`]);
  }

  deleteProduct( id : any ){
    this._productService.deleteProduct(id).subscribe( resp => {
      if (resp.ok) {
       console.log(resp);
      }
    })
  }

  getProductsLimitedTo(event : any){
    this._productService.getProducts(event.target.value.toString()).subscribe( resp => {
      if (resp.ok) {
        this.products = resp.products;
        this.records = resp.products.length;
        this.productsOriginal = [...this.products];
      }
    })
  }

  detailView() {
    this.router.navigate(['/pages/products/maintenance']);
  }

  openModal(data : any) {
    this.productSelected = data;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}

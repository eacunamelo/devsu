import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/products.services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() productSelected : any;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private _productService : ProductService,
    private router: Router
  ) { }


  deleteProduct( id : any ) {
    this._productService.deleteProduct(id).subscribe( resp => {
      if (resp.ok) {
       console.log(resp);
      }
    });

    this.closeModal.emit();
    window.location.reload();
  }
}

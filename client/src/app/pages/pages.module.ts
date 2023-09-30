import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { ProductsListComponent } from './component/products/products-list/products-list.component';
import { ProductsComponent } from './maintenance/products/products.component';

@NgModule({
  declarations: [
    PagesComponent,
    ProductsListComponent,
    ProductsComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class PagesModule { }
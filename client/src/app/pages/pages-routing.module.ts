import { Routes } from '@angular/router';

import { ProductsListComponent } from './component/products/products-list/products-list.component';
import { ProductsComponent } from './maintenance/products/products.component';

export const PAGES_ROUTES: Routes = [
    { path: 'products', component: ProductsListComponent },
    { path: 'products/maintenance', component: ProductsComponent },
    { path: 'products/maintenance/:parametro', component: ProductsComponent }
];
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { PAGES_ROUTES } from "./pages/pages-routing.module";
import { NopagefoundComponent } from './404/nopagefound.component';

const routes: Routes = [
  { path: 'pages', component: PagesComponent, children: PAGES_ROUTES},
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
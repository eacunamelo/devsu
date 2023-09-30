import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ModalComponent
  ],
  exports: [
    HeaderComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }

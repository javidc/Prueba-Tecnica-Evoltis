import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
  ],
  exports: [
    TableModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule
  ],
})
export class PrimengModule { }

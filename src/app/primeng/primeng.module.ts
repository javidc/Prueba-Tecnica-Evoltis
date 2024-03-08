import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    DropdownModule,
    ToastrModule
  ],
  exports: [
    TableModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    DropdownModule,
    ToastrModule
  ],
})
export class PrimengModule { }

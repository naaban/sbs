import { NgModule } from '@angular/core';



import {SalereturnComponent, DialogContentExampleDialog } from './salereturn.component';
import { SalereturnRoutingModule } from './salereturn-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule,
         MatInputModule,
         MatIconModule,
         MatButtonModule,
         MatDialogModule, MatSnackBarModule, MatPaginatorModule, MatTableModule, MatSortModule, MatRippleModule, MatChipsModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { PopupModule } from '../popup/popup.module';
import { PopupComponent } from '../popup/popup.component';
import { SalereturnErrorComponent } from '../errorDisplay/salereturn-error.component';





@NgModule({
  imports: [
    CommonModule,
    SalereturnRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    PopupModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatRippleModule,
    MatChipsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  entryComponents: [SalereturnComponent, SalereturnErrorComponent, DialogContentExampleDialog],

  declarations: [
    SalereturnComponent,
    SalereturnErrorComponent,
    DialogContentExampleDialog,



    ],
    providers: [
      FormBuilder,
    ApiService,
    HttpClientModule,
    PopupComponent

    ]

})
export class SalereturnModule { }

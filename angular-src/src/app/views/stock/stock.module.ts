import { NgModule } from '@angular/core';



import {StockComponent, DialogContentExampleDialog } from './stock.component';
import { StockRoutingModule } from './stock-routing.module';
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
import { StockErrorComponent } from '../errorDisplay/stock-error.component';





@NgModule({
  imports: [
    CommonModule,
    StockRoutingModule,
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
    MatSelectModule
  ],
  entryComponents: [StockComponent, StockErrorComponent, DialogContentExampleDialog],

  declarations: [
    StockComponent,
    StockErrorComponent,
    DialogContentExampleDialog,



    ],
    providers: [
      FormBuilder,
    ApiService,
    HttpClientModule,
    PopupComponent

    ]

})
export class StockModule { }

import { NgModule } from '@angular/core';



import { CurriculumComponent, DialogContentExampleDialog } from './curriculum.component';
import { CurriculumRoutingModule } from './curriculum-routing.module';
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
import { CurriculumErrorComponent } from '../errorDisplay/curriculum-error.component';





@NgModule({
  imports: [
    CommonModule,
    CurriculumRoutingModule,
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
  entryComponents: [CurriculumComponent, CurriculumErrorComponent, DialogContentExampleDialog],

  declarations: [
    CurriculumComponent,
    CurriculumErrorComponent,
    DialogContentExampleDialog,



    ],
    providers: [
      FormBuilder,
    ApiService,
    HttpClientModule,
    PopupComponent

    ]

})
export class CurriculumModule { }

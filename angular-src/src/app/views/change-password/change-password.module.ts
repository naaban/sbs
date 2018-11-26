import { NgModule } from '@angular/core';



import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { CommonModule } from '@angular/common';

import {MatButtonModule,
  MatCheckboxModule,
   MatCardModule, MatRadioModule, MatStepperModule, MatInputModule, MatFormFieldModule} from '@angular/material';
import { FormBuilder } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [


    ChangePasswordComponent
    ],
    providers: [
      FormBuilder
    ]
})
export class ChangePasswordModule { }

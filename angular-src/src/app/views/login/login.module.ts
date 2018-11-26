import { NgModule } from '@angular/core';



import { LoginComponent } from './login.component';

import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  declarations: [
    LoginComponent
     ],
    providers: [
      ApiService,
      HttpClientModule,
      FormBuilder,
      HttpClientModule
    ]
})
export class LoginModule { }

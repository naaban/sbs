import { NgModule } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { SecurityQuestionRoutingModule } from './security-question-routing.module';
import { SecurityQuestionComponent } from './security-question.component';

import { CommonModule } from '@angular/common';

import { MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatRadioModule,
        MatStepperModule,
        MatInputModule,
        MatFormFieldModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SecurityQuestionRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [
    SecurityQuestionComponent
   ],
    providers: [
      FormBuilder
    ]
})
export class SecurityQuestionModule { }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-security-question',
  templateUrl: './security-question.component.html',
  styleUrls: ['./security-question.component.scss']
})
export class SecurityQuestionComponent implements OnInit {
  isLinear = false;
  newPassword: FormGroup;
  reEnter: FormGroup;


  constructor(public formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.newPassword = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.reEnter = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }
}

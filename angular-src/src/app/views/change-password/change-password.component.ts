import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
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

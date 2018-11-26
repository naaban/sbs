import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  arr: any[] = [];
  result: any;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm ) {
    this.arr = form.value;
    console.log(JSON.stringify( this.arr));
    console.log(JSON.stringify( form.value));
    this.adminLogin();
   }
  adminLogin() {
    // this.apiService.getData('/admins/authenticate', ).then(d => {
      
    // });
  }

 




}

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm, NgModel, FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaultLayoutComponent } from '../../containers';
import { PopUP } from '../hero';
import { PopupComponent } from '../popup/popup.component';
import { CurrencyPipe } from '@angular/common';
import { ValueTransformer } from '@angular/compiler/src/util';




export interface DialogData {
  arr1: any;
  values: any;
}
export class AppComponent {
  name = 'Angular 5 reactive form with dynamic fields and validations example';
  public exampleForm: FormGroup;
  totalSum: number = 0;
  totalgst: number = 0;
}

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',

})

export class AddorderComponent implements OnInit {
  discount: FormGroup;
  paidamount: FormGroup;
  grandTotal: any;
  balance: any;
  ngOnInit() {
    const myFormValueChanges$ = this.params.controls['prod'].valueChanges;
    myFormValueChanges$.subscribe(prod => this.updateTotalUnitPrice(prod));



    // this.apiService.getData('/customers/search',{customerphno :fo })
    this.form = this.formBuilder.group({
      customerphno: ['']
    });
    this.discount = this.formBuilder.group({
      disCount: ['']
    });
    this.discount.controls['disCount'].valueChanges.subscribe(
      (value) => {
        this.grandTotal = this.totalSum * value / 100
      }
    )

    this.paidamount = this.formBuilder.group({
      paidAmount: ['']
    })
    this.paidamount.controls['paidAmount'].valueChanges.subscribe(
      (value) => {
        this.balance = this.totalSum+this.totalgst-this.grandTotal - value 
      }
    )
    this.form.controls['customerphno'].valueChanges.subscribe(
      (selectedValue) => {
        this.apiService.getData("/customers/search", { customerphno: selectedValue }).then(d => {
          this.result = d

          if (selectedValue == "") {
            this.result = {
              customerfname: '',
              customerlname: '',
              customerphno: '',
              customeraddres: ''
            }
          }
          console.log(this.result)
          console.log(selectedValue);
        }
        );
      })

  }

  arr: {};
  result: any = [{

  }];
  display: any;
  delete: {};
  arr1: any;
  cData: any;
  defRef: any;
  length: any;
  pageSize = 4;
  printSection: any = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  submitted = false;
  form: FormGroup;
  params: FormGroup;
  // discount: FormGroup;
  customer: {};
  showData = false;

  dataSource: any;

  gstDisplay: any;




  displayedColumns: string[] = ['customerfname', 'customerlname', 'customerphno', 'customeraddres', 'ok'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public exampleForm: FormGroup;
  totalSum: number = 0;
  totalgst: number = 0;
  constructor(public apiService: ApiService,
    public dialog: MatDialog,
    public nav: DefaultLayoutComponent,
    public sbar: MatSnackBar,
    public pop: PopupComponent,
    public formBuilder: FormBuilder,
    public currencyPipe: CurrencyPipe,
    private _fb: FormBuilder) {

    this.params = _fb.group({
      prod: _fb.array([
        this.getProd()
      ])
    })
    this.form = _fb.group({
      customerfname: [''],
      customeraddres: [''],
      customerphno: ['']
    })
    //   this.getCustomerDetails();
    this.discount = this.formBuilder.group({
      disCount: []
    })

    this.paidamount = this.formBuilder.group({
      paidAmount: []
    })


  }
  callDiscount() {

    console.log(this.discount.value);

  }

  addProd() {
    const control = <FormArray>this.params.controls['prod'];
    control.push(this.getProd());
    console.log(this.params.value)
  }
  deleteFieldValue(index) {
    const control = <FormArray>this.params.controls['prod'];
    control.removeAt(index);
  }
  public updateTotalUnitPrice(prod: any) {
    // get our units group controll
    const control = <FormArray>this.params.controls['prod'];
    // before recount total price need to be reset. 
    this.totalSum = 0;
    this.totalgst = 0;
    this.printSection = []
    for (let i in prod) {
      let totalUnitPrice = (prod[i].qty * prod[i].rate);
      let gst = ((prod[i].rate * prod[i].gst) / 100);
      // now format total price with angular currency pipe
      let totalUnitPriceFormatted = this.currencyPipe.transform(totalUnitPrice, 'INR', 'symbol-narrow', '1.2-2');

      let gstFormatted = this.currencyPipe.transform(gst, 'INR', 'symbol-narrow', '1.2-2');
      // update total sum field on unit and do not emit event myFormValueChanges$ in this case on units
      control.at(+i).get('amount').setValue(totalUnitPriceFormatted, { onlySelf: true, emitEvent: false });


      control.at(+i).get('gstrpe').setValue(gstFormatted, { onlySelf: true, emitEvent: false });

      this.printSection.push({
        product: prod[i].product,
        rate: prod[i].rate,
        amount: totalUnitPriceFormatted,
        gstrpe: gstFormatted,
        qty: prod[i].qty,
        calgst:this.currencyPipe.transform(gst/2, 'INR', 'symbol-narrow', '1.2-2')
      })
      console.log(gstFormatted)
      console.log(this.printSection)
      // update total price for all units
      this.totalSum += totalUnitPrice;
      this.totalgst += gst;
      console.log(this.totalgst)
    }


    // this.totalgst= 0;
    // for (let i in prod) {
    //   let total = (prod[i].rate*prod[i].gst/100);
    //   // now format total price with angular currency pipe
    //   let totalUnitPriceFormatted = this.currencyPipe.transform(total, 'INR', 'symbol-narrow', '1.2-2');
    //   // update total sum field on unit and do not emit event myFormValueChanges$ in this case on   units
    //   control.at(+i).get('gst').setValue(totalUnitPriceFormatted, {onlySelf: true, emitEvent: false});
    //   // update total price for all units
    //   this.totalgst += total;
    // }
  }
  //   getTotal() {
  //     let total = 0;
  //     for (var i = 0; i < this.totalSum; i++) {
  //         if (this.totalSum[i].amount) {
  //             total += this.totalSum[i].amount;
  //             this.totalamount = total;
  //         }
  //     }
  //     return total;
  // }

  getProd() {
    return this._fb.group({
      amount: [''],
      barcode: [''],
      product: [''],
      qty: [''],
      rate: [''],
      gst: [''],
      gstrpe: ['']
    })
  }
  changes() {

  }

  print() {

    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();


  }



}
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm, NgModel, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaultLayoutComponent } from '../../containers';
import { PopUP } from '../hero';
import { PopupComponent } from '../popup/popup.component';




export interface DialogData {
  arr1: any;
  values: any;
}


@Component({
  selector: 'app-salereturn',
  templateUrl: './salereturn.component.html',

})

export class SalereturnComponent implements OnInit {
//  branchid : any =[{}];
  
// shopownerid : any =[{}];
  //gst : any =[{}];
  arr: {};
  result: any;
  display: any;
  delete: {};
  arr1: any;
  cData: any;
  defRef: any;
  length: any;
  pageSize = 4;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  display1: any;
  registerForm: FormGroup;
  submitted = false;
  form: FormGroup;

  dataSource: any;

  displayedColumns: string[] = ['VoucherID', 'CustmerName','CustmerContact','Brandname','Modelnum','Purchasedate','Returndate','Description','status','edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(public apiService: ApiService ,
     public dialog: MatDialog,
      public nav: DefaultLayoutComponent ,
      public sbar: MatSnackBar,
      public pop: PopupComponent,
      public formBuilder: FormBuilder) {
        this.showSalereturn();
        // this.getBranchid();
        // this.getShopownerid();
        //this.getGst()
       }

       
  ngOnInit() {
    this.form = this.formBuilder.group({
      
    
      VoucherID:['',Validators.required],
      CustmerName:['',Validators.required],
      CustmerContact:['',Validators.required],
      Modelnum:['',Validators.required],
      Brandname:['',Validators.required],
      Purchasedate:['',Validators.required],
      Returndate:['',Validators.required],
      Description:['',Validators.required],
      status:['',Validators.required]
      
         });

  }
 
  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  

  

  onSubmit(form: NgForm) {
    console.log(this.form);
    if (this.form.valid) {
      this.salesreturnRegister();
      console.log('form submitted');
      console.log(this.form.value);
      this.reset();
    } else {
      this.validateAllFormFields(this.form);
    }

  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  reset() {
    this.form.reset();
  }

  salesreturnRegister() {
    this.apiService.getData('/salereturns/salereturn', JSON.stringify(this.form.value)).then(d => {
      this.result = d;
      console.log(this.result);

      if ( this.result.success === true) {
        this.pop.snakbar('Salereturn Added', 'Successfully');

      } else {
      //  this.pop.snakbar('Stock Register', 'Failed');
        this.pop.snakbar('Salereturn ID or Name is Already Exists', 'Failed');

      //  alert('GST Id or Name is Already Exists');
      }
    //   this.registerForm.reset();
    
      this.showSalereturn();
    });
  }



  showSalereturn() {
    this.apiService.retriveData('/salereturns/salereturn').then(displaySalereturn => {
      this.display = displaySalereturn;
      console.log(this.display);
      this.dataSource = new MatTableDataSource(this.display);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  deleteSalereturn(value) {
    console.log(value);
    this.apiService.deleteData('/salereturns/salereturn/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Salereturn Deleted', 'Successfully');
      this.showSalereturn();

    });
  }



  openDialog(value): void {
    console.log(value);
    this.nav.sidebarMinimized = false;
    const cData = {
     
      
      VoucherID:value.VoucherID,
      CustmerName:value.CustmerName,
      CustmerContact:value.CustmerContact,
      Brandname:value.Brandname,
      Modelnum:value.Modelnum,
      Purchasedate:value.Purchasedate,
      Returndate:value.Returndate,
      Description:value.Description,
      status:value.status
      
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.values._id);
        this.apiService.updateData('/salereturns/salereturn/' + result.values._id, result.cData).then(d => {
          this.pop.snakbar('Salereturn Updated', 'Successfully');
          console.log(d);
          this.showSalereturn();
        });
      }
    });
  }


  
  
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChanged(e) {
    const firstCut = e.pageIndex * e.pageSize;
    const secondCut = firstCut + e.pageSize;
    this.display1 = this.display.slice(firstCut, secondCut);
  }

}



@Component({

  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})

// tslint:disable-next-line:component-class-suffix
export class DialogContentExampleDialog {
  result: any;
  tmpData: any;
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public apiService: ApiService) {

    // this.form.value.cid = this.data.values;
    this.tmpData = this.data;
    console.log(this.tmpData);
  }

  onNoClick() {
    this.data.values = this.tmpData;
    console.log(this.data);
    this.dialogRef.close();

  }
}



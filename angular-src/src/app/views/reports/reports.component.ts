import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm, NgModel, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaultLayoutComponent } from '../../containers';
import { PopUP } from '../hero';
import { PopupComponent } from '../popup/popup.component';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 




export interface DialogData {
  arr1: any;
  values: any;
}


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',

})

export class ReportsComponent implements OnInit {
  category_type : any =[{}];
  product : any =[{}];
  heading : any = "Reports"
  branch : any =[{}];
  gst : any =[{}];
  arr: {};
  result: any;
  display: any;
  delete: {};
  tables : any ={
    expense : false,
    stock : true,
    service: false,
  }
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
  dataSource1: any;
  dataSource2: any;

  options : any

  displayedColumns: string[] = ['stockid', 'model_name','brand_name','category_type','quantity','sp','cp','stock_status','branch'];
  displayedColumns1: string[] = ['ExpenseType', 'Branchname','Amount','descripition','date'];
  displayedColumns2: string[] = ['VoucherID', 'ProductModelnum','ProductBrandname','CustmerName','CustmerContact','JOBNum','others','deliverydate','status'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public apiService: ApiService ,
     public dialog: MatDialog,
      public nav: DefaultLayoutComponent ,
      public sbar: MatSnackBar,
      public pop: PopupComponent,
      public formBuilder: FormBuilder) {
        // this.getBranch();
        // this.getGst()
       }
       //implemented all tables with values ri8 ?
       //all tables implement but its show only one table values
       // i showing difference
       cnvrtToPdf() {
        var data = document.getElementById('toPdf');  
        html2canvas(data).then(canvas => {  
          // Few necessary setting options  
          var imgWidth = 208;   
          var pageHeight = 295;    
          var imgHeight = canvas.height * imgWidth / canvas.width;  
          var heightLeft = imgHeight;  
      
          const contentDataURL = canvas.toDataURL('image/png')  
          let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
          var position = 0;  
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
          pdf.save('MYPdf.pdf'); // Generated PDF   
        });  
      }
       
  ngOnInit() {
    this.form = this.formBuilder.group({
      
    
      stockid:['',Validators.required],
      model_name:['',Validators.required],
      brand_name:['',Validators.required],
      category_type:['',Validators.required],
      product:['',Validators.required],
      battery_no:['',Validators.required],
      color:['',Validators.required],
      quantity:['',Validators.required],
      add_barcode:['',Validators.required],
      imei1:['',Validators.required],
      imei2:['',Validators.required],
      dp:['',Validators.required],
      lp:['',Validators.required],
      sp:['',Validators.required],
      cp:['',Validators.required],
      stock_status:['',Validators.required],
      gst:['',Validators.required],
      branch:['',Validators.required],
      add_date:['',Validators.required],
      remarks:['',Validators.required]
     
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
      this.stockRegister();
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

  stockRegister() {
    this.apiService.getData('/stocks/stock', JSON.stringify(this.form.value)).then(d => {
      this.result = d;
      console.log(this.result);

      if ( this.result.success === true) {
        this.pop.snakbar('Stocks Added', 'Successfully');

      } else {
      //  this.pop.snakbar('Stock Register', 'Failed');
        this.pop.snakbar('Stock ID or Name is Already Exists', 'Failed');

      //  alert('GST Id or Name is Already Exists');
      }
    //   this.registerForm.reset();
    
      this.showStock();
    });
  }



  showStock() {
    this.apiService.retriveData('/stocks/stock').then(displayStock => {
      this.display = displayStock;
      console.log(this.display);
      this.dataSource = new MatTableDataSource(this.display);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  showExpense() {
    this.apiService.retriveData('/expenses/expense').then(displayExpense => {
      this.display = displayExpense;
      console.log(this.display);
      this.dataSource1 = new MatTableDataSource(this.display);
      console.log(this.dataSource);
      this.dataSource1.sort = this.sort;
      this.dataSource1.paginator = this.paginator;
    });
  }

  showService() {
    this.apiService.retriveData('/services/service').then(displayService => {
      this.display = displayService;
      console.log(this.display);
      this.dataSource2 = new MatTableDataSource(this.display);
      console.log(this.dataSource);
      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  deleteStock(value) {
    console.log(value);
    this.apiService.deleteData('/stocks/stock/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Stock Deleted', 'Successfully');
      this.showStock();

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
  showTable(event){
    if(this.options == "expense"){
      this.showExpense()
      this.tables = {
        expense : true,
        stock : false,
        service : false
      }
    }                                   
    else if(this.options == "stock"){
      this.showStock()
      this.tables = {
        expense : false,
        stock : true,
        service :false
      }
    }
    else if(this.options == "service"){
      this.showService()
      this.tables = {
        expense : false,
        stock : false,
        service : true
      }
    }
    console.log(event)
  }

}








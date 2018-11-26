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
  selector: 'app-stock',
  templateUrl: './stock.component.html',

})

export class StockComponent implements OnInit {
  category_type : any =[{}];
  product : any =[{}];
  
  branch : any =[{}];
  gst : any =[{}];
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

  displayedColumns: string[] = ['stockid', 'model_name','brand_name','category_type','quantity','sp','cp','stock_status','branch','edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public apiService: ApiService ,
     public dialog: MatDialog,
      public nav: DefaultLayoutComponent ,
      public sbar: MatSnackBar,
      public pop: PopupComponent,
      public formBuilder: FormBuilder) {
        this.showStock();
        this.getCategory();
        this.getProduct();
        this.getBranch();
        this.getGst()
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



  openDialog(value): void {
    console.log(value);
    this.nav.sidebarMinimized = false;
    const cData = {
     
      
      stockid: value.stockid,
      model_name: value.model_name,
      brand_name: value.brand_name,
      category_type: value.category_type,
      product: value.product,
      battery_no: value.battery_no,
      color: value.color,
      quantity: value.quantity,
      add_barcode: value.add_barcode,
      imei1: value.imei1,
      imei2: value.imei2,
      dp: value.dp,
      lp: value.lp,
      sp: value.sp,
      cp: value.cp,
      stock_status: value.stock_status,
      gst: value.gst,
      branch: value.branch,
      add_date: value.add_date,
      remarks: value.remarks
      
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.values._id);
        this.apiService.updateData('/stocks/stock/' + result.values._id, result.cData).then(d => {
          this.pop.snakbar('Stock Updated', 'Successfully');
          console.log(d);
          this.showStock();
        });
      }
    });
  }
  getCategory(){
    this.apiService.retriveData("/categorys/category").then(category => {
      console.log(category)
      this.category_type = category
      console.log(this.category_type)
    })
  }

  getProduct(){
    this.apiService.retriveData("/products/product").then(product => {
      console.log(product)
      this.product = product
      console.log(this.product)
    })
  }

  getBranch(){
    this.apiService.retriveData("/branchs/branch").then(branch => {
      console.log(branch)
      this.branch = branch
      console.log(this.branch)
    })
  }
  getGst(){
    this.apiService.retriveData("/gsts/gst").then(gst => {
      console.log(gst)
      this.gst = gst
      console.log(this.gst)
    })
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

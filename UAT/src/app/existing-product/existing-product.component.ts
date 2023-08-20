import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../global.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-existing-product',
  templateUrl: './existing-product.component.html',
  styleUrls: ['./existing-product.component.scss']
})
export class ExistingProductComponent implements OnInit {
  productTypeArray = ['Ulip', 'Non-ulip', 'Annuity', 'Group Product'];
  department = ['NB', 'UW', 'PS', 'Claims', 'Group Ops', 'Finance', 'IT'];
  moduleStatus = ['DEV', 'UAT', 'MOVED TO PRODUCTION', 'OPEN WITH IT'];
  stakeHolderName = ['DXC', 'PIO', 'PQ', 'User Dept']
  productNameArray = ['Saral Swadhan+  Series 3', 'SBIL', 'sbil2'];
  headerArray = ['Plan Id', 'Department', 'Module', 'Sub Module', 'Requirement Date', 'Module Status', 'StakeHolder Name', 'Rollout Date', 'Whizible Id', 'Remarks']

  productCode: any;
  dateOfLaunching: any;
  planId: any;
  seriesNumber: any
  // uinArray = ['111N092V03', '222N092V03'];
  productType: any;
  productName: any;
  uin: any;
  patchData: any;
  routerState;
  dataArray: any;
  showData: boolean = false;
  updateProductForm!: FormGroup;
  apiType;
  updationDetails: any;
  model: any = {};

  constructor(public gs: GlobalService, private fb: FormBuilder, public dialog: MatDialog, public router: Router) {
    this.routerState = this.router.getCurrentNavigation().extras.state;
    console.log(this.routerState);
    if (this.routerState) {
      this.model['productName'] = this.routerState['productName']
      this.model['productType'] = this.routerState['productType']
      this.model['uin'] = this.routerState['uin']
    }
  }

  ngOnInit(): void {
    // console.log(this.updateProductForm.value);
    if (this.model['productName'] && this.model['productType'] && this.model['uin']) {
      this.fetchData()
    }
// this.initializeForm2();
// this.initializeForm();
this.newFun()

  }

  initializeForm() {
    this.updateProductForm = this.fb.group({
      // PRODUCT_CODE: [''],
      // DATE_OF_LAUNCH: [''],
      // SERIES_NO: [''],
      data: this.fb.array([this.addData()])
    })
  }
  addProductForm2!: FormGroup;

  initializeForm2() {
    this.addProductForm2 = this.fb.group({
      PRODUCT_CODE: ["", [Validators.required, Validators.maxLength(4)]],
      DATE_OF_LAUNCH: ["", [Validators.required]],
      SERIES_NO: ['', [Validators.required, Validators.maxLength(2), Validators.pattern("^[0-9]*$")]],

    })
  }

  addData() {
    return this.fb.group({
      PLAN_ID: ["", [ Validators.maxLength(10)]],
      DEPARTMENT: ["", [Validators.required]],
      MODULE: ["", [ Validators.maxLength(100)]],
      SUB_MODULE: ["", [ Validators.maxLength(100)]],
      MODULE_REQUIREMENT_DATE: ["", [Validators.required]],
      MODULE_STATUS: ["", [Validators.required]],
      STAKEHOLDER_NAME: ["", [Validators.required]],
      MODULE_ROLLED_OUT_DATE: ["", [Validators.required]],
      WHIZIBLE_ID: ["", [ Validators.maxLength(10)]],
      REMARKS: [""],
      ID: [""]
    })
  }

  get getDataArray() {
    return this.updateProductForm.controls["data"] as FormArray;

  }

  pushIntoData(type?) {
    console.log(type);
    this.apiType = type
    this.getDataArray.push(this.addData())
  }

  deleteData(i: number) {
    this.getDataArray.removeAt(i)
  }

  async submit() {
    console.log(this.addProductForm2.value);
    console.log(this.updationDetails);
    this.dialog.closeAll();
    this.gs.loader=true

    if (this.updateProductForm.invalid || this.addProductForm2.invalid) {
      this.updateProductForm.markAllAsTouched();
      this.updateProductForm.markAsDirty()
      this.addProductForm2.markAllAsTouched();
      this.addProductForm2.markAsDirty()
      return
    }
    if (!this.addProductForm2.value['PRODUCT_CODE'] && !this.addProductForm2.value['DATE_OF_LAUNCH'] && !this.addProductForm2.value['SERIES_NO']) {
      console.log('error', typeof localStorage.getItem('SERIES_NO'));
      this.updationDetails['PRODUCT_CODE'] = localStorage.getItem('PRODUCT_CODE');
      this.updationDetails['DATE_OF_LAUNCH'] = localStorage.getItem('DATE_OF_LAUNCH');
      this.updationDetails['SERIES_NO'] = localStorage.getItem('SERIES_NO');
      console.log(this.updationDetails);

    }
    else {
      this.updationDetails['PRODUCT_CODE'] = this.addProductForm2.value['PRODUCT_CODE'];
      this.updationDetails['DATE_OF_LAUNCH'] = this.addProductForm2.value['DATE_OF_LAUNCH'];
      this.updationDetails['SERIES_NO'] = this.addProductForm2.value['SERIES_NO'];
    }
    this.updationDetails['UIN'] = this.model['uin'];
    this.updationDetails['PRODUCT_TYPE'] = this.model['productType'];
    this.updationDetails['PRODUCT_NAME'] = this.model['productName'];
    this.updationDetails['API_TYPE'] = this.apiType ? 'add' : 'update';

    if (this.apiType == 'add') {
      delete this.updationDetails['ID']
    }
    console.log(this.updationDetails);

    let arr = []
    arr.push(this.updationDetails);
    this.dialog.closeAll();
    await this.gs.updateProductData(arr).subscribe(res => {
      this.updateProductForm.reset()
    this.gs.loader=false

      setTimeout(() => {
        this.fetchData()
      }, 100);
    })
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>, data?: any,type?:any,ind?:any) {
    console.log(templateRef,data,type,ind);
    
    if(type=='delete' && data.status=='INVALID'){
     this.deleteData(ind);
     return
    }
    this.dialog.open(templateRef)
    
    this.updationDetails = data.value;
    console.log(this.updationDetails);
  }

  close() {
    this.dialog.closeAll()
  }

  patchForm(data?: any) {
    console.log(data);

    let obj;
    if (data) {
      for (let i = 0; i < data.length; i++) {
        delete data[i]['PRODUCT_TYPE']
        delete data[i]['PRODUCT_NAME']
        delete data[i]['UIN']
      }
    }
    obj = {
      PRODUCT_CODE: data[0]['PRODUCT_CODE'],
      DATE_OF_LAUNCH: data[0]['DATE_OF_LAUNCH'],
      SERIES_NO: data[0]['SERIES_NO'],
      data: data
    }

    for (let index = 1; index < obj.data.length; index++) {
      this.pushIntoData()
    }
    this.updateProductForm.patchValue(obj);
    this.addProductForm2.patchValue(obj)
    console.log(this.updateProductForm.value);

    this.updateProductForm.disable()
    this.addProductForm2.disable()


  }
  
  fetchData() {
    let obj = {
      productType: this.model['productType'] ,
      productName: this.model['productName'] ,
      uin: this.model['uin'] ,
      filterType: 'existing'
    }
    this.gs.loader=true

    // this.updateProductForm.controls['PRODUCT_CODE'].disable();
    this.gs.fetchProductData(obj).subscribe(res => {
    this.gs.loader=false
      this.dataArray = res;
      this.showData = true;
      this.initializeForm();
      this.initializeForm2()
      console.log(this.dataArray);
      for (let i = 0; i < this.dataArray.length; i++) {
        var MODULE_REQUIREMENT_DATE = this.dataArray[i]['MODULE_REQUIREMENT_DATE'].split("/");    // ["25", "09", "2019"]
        var DATE_OF_LAUNCH = this.dataArray[i]['DATE_OF_LAUNCH'].split("/");    // ["25", "09", "2019"]
        var MODULE_ROLLED_OUT_DATE = this.dataArray[i]['MODULE_ROLLED_OUT_DATE'].split("/");    // ["25", "09", "2019"]
        this.dataArray[i]['MODULE_REQUIREMENT_DATE'] = new Date(parseInt(MODULE_REQUIREMENT_DATE[2]),parseInt(MODULE_REQUIREMENT_DATE[1])-1,parseInt(MODULE_REQUIREMENT_DATE[0]));
        this.dataArray[i]['DATE_OF_LAUNCH'] = new Date(parseInt(DATE_OF_LAUNCH[2]),parseInt(DATE_OF_LAUNCH[1])-1,parseInt(DATE_OF_LAUNCH[0]));
        this.dataArray[i]['MODULE_ROLLED_OUT_DATE'] = new Date(parseInt(MODULE_ROLLED_OUT_DATE[2]),parseInt(MODULE_ROLLED_OUT_DATE[1])-1,parseInt(MODULE_ROLLED_OUT_DATE[0])); 
      }
      
      if (this.dataArray.length) {
        localStorage.setItem('DATE_OF_LAUNCH', this.dataArray[0]['DATE_OF_LAUNCH'])
        localStorage.setItem('SERIES_NO', this.dataArray[0]['SERIES_NO'])
        localStorage.setItem('PRODUCT_CODE', this.dataArray[0]['PRODUCT_CODE'])

        this.patchForm(this.dataArray);
      }
    })
  }

  delete() {
    this.gs.loader=true

    this.updationDetails['API_TYPE'] = 'delete';
    this.updationDetails['UIN'] = this.model['uin'];
    this.updationDetails['PRODUCT_TYPE'] = this.model['productType'];
    this.updationDetails['PRODUCT_NAME'] = this.model['productName'];
    this.updationDetails['PRODUCT_CODE'] = this.addProductForm2.value['PRODUCT_CODE'];
    this.updationDetails['DATE_OF_LAUNCH'] = this.addProductForm2.value['DATE_OF_LAUNCH'];
    this.updationDetails['SERIES_NO'] = this.addProductForm2.value['SERIES_NO'];

    let arr = []
    arr.push(this.updationDetails);
    console.log(arr);
    this.dialog.closeAll();
    this.gs.updateProductData(arr).subscribe(res => {
      console.log(res);
    this.gs.loader=false

      setTimeout(() => {
        this.fetchData()
      }, 150);
    })
  }

  unableDisable(data) {
    console.log(data.value);
    // this.updateProductForm.controls['PRODUCT_CODE'].enable();
    // data.controls.enable()
    Object.keys(data.controls).forEach(key => {
      data.controls[key].enable();
    });
  }

  prodNameArray;
  showHideProductInput:boolean=false;
  showHideUinInput:boolean=false;
  
  async filterProduct(){
    this.gs.loader=true

    let obj={
      filterType:"prod_type",
      productType:this.model['productType']
    }
  
   console.log(obj);
   await this.gs.filterProductData(obj).subscribe(res=>{
    this.gs.loader=false
    
    console.log(res);
     this.prodNameArray=res;
     if(this.prodNameArray.length==0){
      this.showHideProductInput=true
     }
   })
  }
  uinArray;
  
  async filterUin(){
    this.gs.loader=true

    let obj={
      filterType:"prod_name",
      productType:this.model['productType'],
      productName:this.model['productName']
    }
  
   console.log(obj);
   await this.gs.filterUinData(obj).subscribe(res=>{
     console.log(res);
    this.gs.loader=false

     this.uinArray=res;
     
   })
  }


  confirm() {
    console.log(this.alertType, this.dataToDelete);
    if (this.alertType == 'delete') {
      this.deleteData(this.dataToDelete)
    } else {
      this.pushIntoData('add')
    }
    this.dialog.closeAll()

  }

  dataToDelete;
  alertType;

  openDialogFormArray(templateRef: TemplateRef<any>, type?, data?) {
    this.dataToDelete = data;
    this.alertType = type
    this.dialog.open(templateRef)
  }
date:any;
year:any;
month:any;
dt:any;
  newFun(){
  var date = new Date('2006-11-11T18:30:00.000Z');
this.year = date.getFullYear();
this.month = date.getMonth()+1;
this.dt = date.getDate();

if (this.dt < 10) {
  this.dt = '0' + this.dt;
}
if (this.month < 10) {
  this.month = '0' + this.month;
}

  console.log(this.dt + '/' + this.month + '/' + this.year);
  }

}



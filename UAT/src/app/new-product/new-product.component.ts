import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  productTypeArray = ['Ulip', 'Non-ulip', 'Annuity', 'Group Product'];
  department = ['NB', 'UW', 'PS', 'Claims', 'Group Ops', 'Finance', 'IT'];
  moduleStatus = ['DEV', 'UAT', 'MOVED TO PRODUCTION', 'OPEN WITH IT'];
  stakeHolderName = ['DXC', 'PIO', 'PQ', 'User Dept'];
  headerArray = ['Plan Id', 'Department', 'Module', 'Sub Module', 'Requirement Date', 'Module Status', 'StakeHolder Name', 'Rollout Date', 'Whizible Id', 'Remarks']
  constructor(public gs: GlobalService, private fb: FormBuilder, public dialog: MatDialog, public router: Router) { }
  submited: boolean = false

  addProductForm!: FormGroup;
  addProductForm2!: FormGroup;
  productType: any;
  productName: any;
  uin: any;
  filteredData = [];
  data;
  showHideForm: boolean = false;
  dataToDelete;
  alertType;
  model: any = {};
  ngOnInit(): void {
    this.initializeForm();
    this.initializeForm2();
    //  this.gs.loader=true
  }

  initializeForm() {
    this.addProductForm = this.fb.group({
      data: this.fb.array([this.addData()])
    })
  }
  initializeForm2() {
    this.addProductForm2 = this.fb.group({
      PRODUCT_CODE: ["", [Validators.required, Validators.maxLength(4)]],
      DATE_OF_LAUNCH: ["", [Validators.required]],
      SERIES_NO: ['', [Validators.required, Validators.maxLength(2), Validators.pattern("^[0-9]*$")]],

    })
  }
  addData() {
    return this.fb.group({
      PLAN_ID: ["", [Validators.maxLength(10)]],
      DEPARTMENT: ["", [Validators.required]],
      MODULE: ["", [Validators.maxLength(100)]],
      SUB_MODULE: ["", [Validators.maxLength(100)]],
      MODULE_REQUIREMENT_DATE: ["", [Validators.required]],
      MODULE_STATUS: ["", [Validators.required]],
      STAKEHOLDER_NAME: ["", [Validators.required]],
      MODULE_ROLLED_OUT_DATE: ["", [Validators.required]],
      WHIZIBLE_ID: ["", [Validators.maxLength(10)]],
      REMARKS: [""]
    })
  }

  get getDataArray() {
    return this.addProductForm.controls["data"] as FormArray;
  }

  pushIntoData() {
    this.getDataArray.push(this.addData())
  }

  deleteData(i: number) {
    this.getDataArray.removeAt(i)
  }

  submit() {
    this.dialog.closeAll();
    console.log(this.addProductForm);
     this.gs.loader=true
    if (this.addProductForm.invalid || this.addProductForm2.invalid) {
      this.addProductForm.markAllAsTouched();
      this.addProductForm.markAsDirty()
      this.addProductForm2.markAllAsTouched();
      this.addProductForm2.markAsDirty()
      return
    }
    let policyArray: any = []
    this.addProductForm.value.data.forEach((element: any) => {
      element['DATE_OF_LAUNCH'] = this.addProductForm2.value['DATE_OF_LAUNCH'];
      element['PRODUCT_TYPE'] = this.model['productType'];
      element['PRODUCT_NAME'] = this.model['productName'];
      element['UIN'] = this.model['uin'];
      element['PRODUCT_CODE'] = this.addProductForm2.value['PRODUCT_CODE'];
      element['SERIES_NO'] = this.addProductForm2.value['SERIES_NO'];
      // element['MODULE_ID'] = 1;
      element['API_TYPE'] = 'add';

      policyArray.push(element)
    });
    this.gs.updateProductData(policyArray).subscribe(res => {
      console.log(res);
      this.gs.loader=false
      this.addProductForm.reset();
      this.productType = '';
      this.productName = '';
      this.uin = '';
    })
  }

  confirm() {
    console.log(this.alertType, this.dataToDelete);
    if (this.alertType == 'delete') {
      this.deleteData(this.dataToDelete)
    } else {
      this.pushIntoData()
    }
    this.dialog.closeAll()

  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>, type?, data?) {
    this.dataToDelete = data;
    this.alertType = type
    this.dialog.open(templateRef)
  }

  close() {
    this.dialog.closeAll()
  }

  async fetchData() {
    this.model['filterType'] = "existing";
    console.log(this.model);
    this.submited = true;
    this.gs.loader=true

    // let obj = {
    //   productType: this.productType,
    //   productName: this.productName,
    //   uin: this.uin,
    //   filterType: 'existing'
    // }
    // console.log(obj);

    await this.gs.fetchProductData(this.model).subscribe(res => {
      console.log(res);
      this.gs.loader=false
      if (res && res.length) {
        localStorage.setItem('DATE_OF_LAUNCH', res[0]['DATE_OF_LAUNCH'])
        localStorage.setItem('SERIES_NO', res[0]['SERIES_NO'])
        localStorage.setItem('PRODUCT_CODE', res[0]['PRODUCT_CODE'])

        alert('data already present please update')
        this.router.navigate(['existing-product'], {
          state: this.model
        })
      }
      else {
        alert('no data found please add');
        this.showHideForm = true
      }
    })

  }

prodNameArray;
showHideProductInput:boolean=false;
showHideUinInput:boolean=false;

async filterProduct(){
  let obj={
    filterType:"prod_type",
    productType:this.model['productType']
  }
  this.gs.loader=true

 console.log(obj);
 await this.gs.filterProductData(obj).subscribe(res=>{
   console.log(res);
   this.gs.loader=false
   this.prodNameArray=res;
   if(this.prodNameArray.length==0){
    this.showHideProductInput=true
   }
 })
}
uinArray;

async filterUin(){
  let obj={
    filterType:"prod_name",
    productType:this.model['productType'],
    productName:this.model['productName']
  }
  this.gs.loader=true

 console.log(obj);
 await this.gs.filterUinData(obj).subscribe(res=>{
   console.log(res);
   this.gs.loader=false
   this.uinArray=res;
   
 })
}

public codeValue: string;
public codeList = [
  { id: 1, name: 'Angular 2+' },
  { id: 2, name: 'Angular 4' },
  { id: 3, name: 'Angular 5' },
  { id: 4, name: 'Angular 6' },
  { id: 5, name: 'Angular 7' },
  { id: 5, name: 'Angular 8' },
  { id: 5, name: 'Angular 9' },
  { id: 5, name: 'Angular 11' },
  { id: 5, name: 'Angular 12' },
];

public saveCode(e): void {
  let find = this.codeList.find(x => x?.name === e.target.value);
  console.log(find?.id);
}

}
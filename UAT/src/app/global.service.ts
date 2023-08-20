import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';
  public loader:boolean=false
  constructor(private router: Router, private http: HttpClient) { }



  excelData = {
    "PRODUCT_NAME": "abc",
    "UIN": "111N092V03",
    "PRODUCT_TYPE": "Ulip",
    "PRODUCT_CODE": "swagat",
    "DATE_OF_LAUNCH": "2021-09-29T18:30:00.000Z",
    "SERIES_NO": "1J",
    "data": [
      {
        "PLAN_ID": "1",
        "DEPARTMENT": "Group Ops",
        "MODULE": "1",
        "SUB_MODULE": "1",
        "MODULE_REQUIREMENT_DATE": "2021-09-29T18:30:00.000Z",
        "MODULE_STATUS": "UAT",
        "STAKEHOLDER_NAME": "DXC",
        "MODULE_ROLLED_OUT_DATE": "2021-09-29T18:30:00.000Z",
        "WHIZIBLE_ID": "1",
        "REMARKS": "a"
      },
      {
        "PLAN_ID": "2",
        "DEPARTMENT": "Claims",
        "MODULE": "2",
        "SUB_MODULE": "2",
        "MODULE_REQUIREMENT_DATE": "2021-09-28T18:30:00.000Z",
        "MODULE_STATUS": "MOVED TO PRODUCTION",
        "STAKEHOLDER_NAME": "PQ",
        "MODULE_ROLLED_OUT_DATE": "2021-09-28T18:30:00.000Z",
        "WHIZIBLE_ID": "2",
        "REMARKS": "b"
      },
      {
        "PLAN_ID": "3",
        "DEPARTMENT": "Group Ops",
        "MODULE": "3",
        "SUB_MODULE": "3",
        "MODULE_REQUIREMENT_DATE": "2021-09-29T18:30:00.000Z",
        "MODULE_STATUS": "UAT",
        "STAKEHOLDER_NAME": "DXC",
        "MODULE_ROLLED_OUT_DATE": "2021-09-29T18:30:00.000Z",
        "WHIZIBLE_ID": "3",
        "REMARKS": "c"
      },
      {
        "PLAN_ID": "4",
        "DEPARTMENT": "Group Ops",
        "MODULE": "4",
        "SUB_MODULE": "4",
        "MODULE_REQUIREMENT_DATE": "2021-09-29T18:30:00.000Z",
        "MODULE_STATUS": "UAT",
        "STAKEHOLDER_NAME": "DXC",
        "MODULE_ROLLED_OUT_DATE": "2021-09-29T18:30:00.000Z",
        "WHIZIBLE_ID": "4",
        "REMARKS": "d"
      },
      {
        "PLAN_ID": "5",
        "DEPARTMENT": "Group Ops",
        "MODULE": "5",
        "SUB_MODULE": "5",
        "MODULE_REQUIREMENT_DATE": "2021-09-29T18:30:00.000Z",
        "MODULE_STATUS": "UAT",
        "STAKEHOLDER_NAME": "DXC",
        "MODULE_ROLLED_OUT_DATE": "2021-09-29T18:30:00.000Z",
        "WHIZIBLE_ID": "5",
        "REMARKS": "e"
      }
    ]
  }

  navigateToUrl(val: any) {
    console.log(val);
    this.router.navigate([val]);
  }

  login(userName: string, password: string) {
    return this.http.post('/core/login', { login: userName, password: password })
      .toPromise().then((user => {
        var userDetailsObj = {
          "currentUser": JSON.stringify(user),
          "validLogin": true
        };
        // return true;
        return userDetailsObj;
      })).catch((error: HttpErrorResponse) => {
        console.log(error);
        this.errorHandler(error);
        return false;
      });
  }

  private httpErrorMessage!: string;

  errorHandler(error: HttpErrorResponse): boolean {
    if (error.status === 400) {
      this.httpErrorMessage = 'Server Error';
    } else if (error.status === 403) {
      this.httpErrorMessage = 'Forbidden!!';
    } else {
      this.httpErrorMessage = 'Server Error!!';
    }
    return false;
  }



  public fetchProductData(data: any) {
    console.log('sendProcessDetails :: ', data);
     let url = '/core/fetchProductData';
  //  let url = '../../assets/product_calender_data.json'
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      headers: httpHeaders,
    };
    return this.http.post<any>(url, data, options); //TODO remove comments
  //  return this.http.get<any>(url);
  }


  public filterProductData(data: any) {
    console.log('sendProcessDetails :: ', data);
   let url = '/core/fetchProductData';
    //  let url = '../../assets/prodname.json'
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      headers: httpHeaders,
    };
    return this.http.post<any>(url, data, options); //TODO remove comments
    //  return this.http.get<any>(url);
  }
  public filterUinData(data: any) {
    console.log('sendProcessDetails :: ', data);
    let url = '/core/fetchProductData';
    // let url = '../../assets/prodname.json'
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      headers: httpHeaders,
    };
    return this.http.post<any>(url, data, options); //TODO remove comments
    // return this.http.get<any>(url);
  }
  reqYear: any;
  reqMonth: any;
  reqDate: any;
  rollYear: any;
  rollMonth: any;
  rollDate: any;
  launchYear: any;
  launchMonth: any;
  launchDate: any;
  public updateProductData(data: any) {

    for (let i = 0; i < data.length; i++) {
      // reqDate
      data[i]['MODULE_REQUIREMENT_DATE'] = new Date(data[i]['MODULE_REQUIREMENT_DATE']);
      this.reqYear = data[i]['MODULE_REQUIREMENT_DATE'].getFullYear();
      this.reqMonth = data[i]['MODULE_REQUIREMENT_DATE'].getMonth() + 1;
      this.reqDate = data[i]['MODULE_REQUIREMENT_DATE'].getDate();
      if (this.reqDate < 10) {
        this.reqDate = '0' + this.reqDate;
      }
      if (this.reqMonth < 10) {
        this.reqMonth = '0' + this.reqMonth;
      }
      data[i]['MODULE_REQUIREMENT_DATE'] = this.reqDate + '/' + this.reqMonth + '/' + this.reqYear;

      // rolloutdate
      data[i]['MODULE_ROLLED_OUT_DATE'] = new Date(data[i]['MODULE_ROLLED_OUT_DATE']);
      this.rollYear = data[i]['MODULE_ROLLED_OUT_DATE'].getFullYear();
      this.rollMonth = data[i]['MODULE_ROLLED_OUT_DATE'].getMonth() + 1;
      this.rollDate = data[i]['MODULE_ROLLED_OUT_DATE'].getDate();
      if (this.rollDate < 10) {
        this.rollDate = '0' + this.rollDate;
      }
      if (this.rollMonth < 10) {
        this.rollMonth = '0' + this.rollMonth;
      }

      data[i]['MODULE_ROLLED_OUT_DATE'] = this.rollDate + '/' + this.rollMonth + '/' + this.rollYear;

      // launchDate
      data[i]['DATE_OF_LAUNCH'] = new Date(data[i]['DATE_OF_LAUNCH']);
      this.launchYear = data[i]['DATE_OF_LAUNCH'].getFullYear();
      this.launchMonth = data[i]['DATE_OF_LAUNCH'].getMonth() + 1;
      this.launchDate = data[i]['DATE_OF_LAUNCH'].getDate();
      if (this.launchDate < 10) {
        this.launchDate = '0' + this.launchDate;
      }
      if (this.launchMonth < 10) {
        this.launchMonth = '0' + this.launchMonth;
      }

      data[i]['DATE_OF_LAUNCH'] = this.launchDate + '/' + this.launchMonth + '/' + this.launchYear;

    }
   
    let url = '/core/updateProductData';
    // let url='../../assets/product_calender_data.json'

    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      headers: httpHeaders,
    };
    return this.http.post<any>(url, data, options); //TODO remove comments
    // return this.http.get<any>(url);
  }


  public getMisList(data:any){
    let url = '/core/processInput'
      // let url = "../../assets/response_object.json";
      // let url = "../../assets/mis_data copy.json";
      console.log(url)
      
  
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      params: data
    }; 
    return this.http.post<any>(url ,data, options ); //TODO remove comments
    // return this.http.get<any>(url);
  
  }

  public getMisData(data:any){
    let url = '/core/processInput'
      // let url = "../../assets/response_object.json";
      // let url = "../../assets/mis_data copy.json";
      console.log(url)
      
  
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      params: data
    }; 
    return this.http.post<any>(url ,data, options ); //TODO remove comments
    // return this.http.get<any>(url);
  
  }

}


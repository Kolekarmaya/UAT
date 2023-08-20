import { formatDate } from '@angular/common';
import { Component, Input, NgZone, OnInit } from '@angular/core';
// import { MatDatepicker, MatDialog, MatTableDataSource } from '@angular/material';
import { GlobalService } from '../global.service';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
// import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment} from 'moment';

const moment = _moment;

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'MM/YYYY',
//   },
//   display: {
//     dateInput: 'MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

@Component({
  selector: 'app-mis-report',
  templateUrl: './mis-report.component.html',
  styleUrls: ['./mis-report.component.scss'],
  providers:[]
 

})
export class MisReportComponent implements OnInit {
  @Input()
  max: any;

  constructor(public gs:GlobalService,public es: JsontoexcelService,private ngZone: NgZone) { }

  displayedColumns: string[];
  today = new Date();
  showHide: boolean = false
  ngOnInit(): void {
    this.displayedColumns = ['PAYOUT_NAME','TOTAL_CASES_YTD','PASS_CASES_YTD','FAIL_CASES_YTD', 'WIP_YTD','TOTAL_CASES_FTM','PASS_CASES_FTM','FAIL_CASES_FTM',
    'WIP_FTM','TOTAL_CASES_FTD','PASS_CASES_FTD','FAIL_CASES_FTD','WIP_FTD'];

    this.getList();
  }

  // showHidePicker() {
  //   if (this.showHide) {
  //     this.showHide = false
  //   } else {
  //     this.showHide = true
  //   }
  // }
  
  // var currentDate = new Date();
  startDate = formatDate(new Date().toDateString(), "dd/MM/yyyy", "en");
  endDate = formatDate(new Date().toDateString(), "dd/MM/yyyy", "en");
  // startDate;
  showOverlay: boolean = false;
  mis_data;
  noData: boolean = true;
  displayMessage: boolean = false;
  
  messageType; //06-05-21
  message; //06-05-21
  isError = false;
  messageDetails;
  emptyArr: boolean = false;
  misReportDate;
  async getList(){
    // this.gs.loader=true
    this.showOverlay = true
    // this.startDate = formatDate(this.startDate, "dd/MM/yyyy", "en");
    console.log('startDate >>', this.startDate, typeof(this.startDate));
    this.misReportDate = this.startDate;
    
    let obj={
      module_id:35,
      submodule_id:1,
      start_date:this.startDate,
      end_date : this.endDate,
      requested_by: 'Admin',
      request_action: 1
      
    }
    console.log('data: MIS >>',obj);
    
    await this.gs.getMisList(obj).subscribe(
      
      (response)=>{
        this.messageType = 'Information Message :  ';
        console.log('messageType >>', this.messageType);
        
        // this.message = 'server [ response_code : ' + response.response_code + ' ]';
        this.message = 'Response_code : ' + response.response_code;
        console.log('message >>', this.message);
        
        this.messageDetails = response.response_message;
        this.displayMessage = true;
        var res = response;
        console.log(res);
        // this.gs.loader=false;
        this.showOverlay = false;
        this.startDate="";
        // alert(res.response_message);
        this.isError = false;
        if(res.response_text.length > 0){
          // this.noData = false;
          this.mis_data = res.response_text;
          this.emptyArr = false;
          this.showHide = false;
          // this.es.exportAsExcelFile(res.response_text, 'mis_report');
        }else{
          // this.noData = true;
          this.emptyArr = true;
          this.displayMessage = true;
  
          // alert("No data found")
        }

      },
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message= 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  '+ error.statusText; 
        this.displayMessage = true;
        // this.noData = false;

        this.isError = true;

        // this.messageType = 'Error Message :  ';
        // console.log('messageType >>', this.messageType);

        // this.message = 'client [ error_code : ' + error.status + ' ]';
        // console.log('message >>', this.message);

        // this.messageDetails = error.statusText;
        // console.log('messageDetails >>>', this.messageDetails);
        // return;

      }
    );
  }
  subMIS = false;
  // subMISNoData = true;
  showMessage() {
    this.displayMessage = false;
    console.log('subMIS >>',this.subMIS,'noData >>',this.noData,'emptyArr >>',this.emptyArr, 'isError >>', this.isError, 'displayMessage >>', this.displayMessage);
    
    if ( this.emptyArr == false && this.isError == false ) {
      
      this.noData = false;
    } else {
      this.noData = true;
    }
    this.ngZone.run(() =>{ });  
  }
  exportAsXLSX() {
    this.es.exportAsExcelFile(this.mis_data, 'mis_report');
    
  }

  showDiv = true;
  betweenDatesClicked = false;
  monthlyClicked = false;
  ageingMISClicked = false;
  // subMIS = false;
  handleClick ( misType ) {
    console.log( 'misType >>', misType );
    this.subMIS = true;

    if ( misType && misType === 'betweenDates' ) {
      this.betweenDatesClicked = true;
      this.subModuleId = 2;
      this.monthlyClicked = false;
      this.ageingMISClicked = false;
    }
    if ( misType && misType === 'monthly' ) {
      this.subModuleId = 3;
      this.monthlyClicked = true;
      this.betweenDatesClicked = false;
      this.ageingMISClicked = false;
    }
    if ( misType && misType === 'ageingMIS' ) {
      this.subModuleId = 4;
      this.ageingMISClicked = true;
      this.betweenDatesClicked = false;
      this.monthlyClicked = true;

    }

  }

  date = new FormControl(moment());

  setMonthAndYear (normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    var _date = this.date.value;
    var date = new Date(_date), y = date.getFullYear(), m = date.getMonth();
    console.log(date, y, m);
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y,m+1,0);
    console.log(firstDay,lastDay);
    // console.log(formatDate(firstDay.toDateString(), "dd/MM/yyyy", "en"));
    this.formatDate(firstDay,lastDay);
  
  }

  exportMISDate = false;
  formatDate(startDate, endDate) {
    this.startDate = formatDate(startDate.toDateString(), "dd/MM/yyyy", "en");
    this.endDate = formatDate(endDate.toDateString(), "dd/MM/yyyy", "en");
    // this.getList();
    // this.submitDateRange();

    


  }

  subModuleId = 1;
  getMISDataDetails() {
    let obj={
      module_id:35,
      submodule_id: this.subModuleId,
      start_date:this.startDate,
      end_date : this.endDate,
      requested_by: 'Admin',
      request_action: 1      
    }
    console.log('data: MIS >>',obj);
    
    this.gs.getMisData(obj).subscribe(
      (response) => {
        // var res = response;
         this.exportMISDate = true;

         console.log('response>>', res);
        //  this.misData = res.response_text;

         this.messageType = 'Information Message :  ';
        console.log('messageType >>', this.messageType);
        
        // this.message = 'server [ response_code : ' + response.response_code + ' ]';
        this.message = 'Response_code : ' + response.response_code ;
        console.log('message >>', this.message);
        
        this.messageDetails = response.response_message;
        this.displayMessage = true;
        var res = response;
        console.log(res);
        // this.gs.loader=false;
        this.showOverlay = false;
        this.startDate="";
        // alert(res.response_message);
        this.isError = false;
        if(res.response_text.length > 0){
          // this.noData = false;
          this.misData = res.response_text;
          this.emptyArr = false;
          this.showHide = false;
          // this.es.exportAsExcelFile(res.response_text, 'mis_report');
        }else{
          // this.noData = true;
          this.emptyArr = true;
          this.displayMessage = true;
  
          // alert("No data found")
        }


      },
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message= 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  '+ error.statusText; 
        this.displayMessage = true;
        // this.noData = false;

        this.isError = true;

      }

    ) ;

  }
  misData;
  exportMISDataAsXLSX(){
    this.es.exportAsExcelFile(this.misData, 'mis_report');

  }
  startdate_ = new FormControl(moment());

  addStartDate(event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${event.value}`);
     this.startDate=`${event.value}`;
     console.log('addStartDate >>',this.startDate)
     this.startDate = formatDate(this.startDate, "dd/MM/yyyy", "en");
     console.log('addStartDate >>',this.startDate);
     this.startdate_.setValue(this.startDate);

   }
 
   addEndDate(event: MatDatepickerInputEvent<Date>) {
     // this.events.push(`${event.value}`);
      this.endDate=`${event.value}`;
      this.endDate = formatDate(this.endDate, "dd/MM/yyyy", "en");   
   }
   
   submitDateRange(){
     this.getMISDataDetails();
     

   }




}

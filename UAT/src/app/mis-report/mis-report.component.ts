import { formatDate } from '@angular/common';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { FormControl } from '@angular/forms';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment} from 'moment';

const moment = _moment;

@Component({
  selector: 'app-mis-report',
  templateUrl: './mis-report.component.html',
  styleUrls: ['./mis-report.component.scss']
})

export class MisReportComponent implements OnInit {
  @Input()
  max: any;

  constructor(public gs:GlobalService,public es: JsontoexcelService,private ngZone: NgZone) { }

 
// var firstDay = new Date(y, m, 1);
// var lastDay = new Date(y, m + 1, 0);
today = new Date();
year;
month;
dayDate;
  startDate;
  // formatDate(this.today.toDateString(), "dd/MM/yyyy", "en");
  endDate ;
  // formatDate(this.today.toDateString(), "dd/MM/yyyy", "en");
  displayedColumns: string[];
  
  ngOnInit(): void {
    this.displayedColumns = ['PAYOUT_NAME','TOTAL_CASES_YTD','PASS_CASES_YTD','FAIL_CASES_YTD', 'WIP_YTD','TOTAL_CASES_FTM','PASS_CASES_FTM','FAIL_CASES_FTM',
    'WIP_FTM','TOTAL_CASES_FTD','PASS_CASES_FTD','FAIL_CASES_FTD','WIP_FTD'];
    
    this.setStartAndEndDate();
    this.getList();
  }
  
  setStartAndEndDate () {    
    this.today = new Date();
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();
    this.dayDate = this.today.getDate();
    this.startDate = this.formatDate(new Date(this.year, this.month, 1));
    this.endDate = this.formatDate(new Date(this.year, this.month + 1, 0));
  }

  showOverlay: boolean = false;
  mis_data;
  noData: boolean = true;
  displayMessage: boolean = false;
  
  messageType; //06-05-21
  message; //06-05-21
  isError = false;
  messageDetails;
  emptyArr: boolean = false;
  misReportDate = formatDate(new Date(), "dd/MM/yyyy", "en");

  subModuleId = 1;
  async getList(){
    this.showOverlay = true
    this.misReportDate = formatDate(new Date(), "dd/MM/yyyy", "en");       
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
        // this.message = 'server [ response_code : ' + response.response_code + ' ]';
        this.message = 'Response_code : ' + response.response_code ;
        this.messageDetails = response.response_message;
        this.displayMessage = true;

        var res = response;
        console.log(res);
        this.showOverlay = false;
        this.startDate="";
        this.endDate ="";
        this.isError = false;
        if(res.response_text.length > 0){
          this.mis_data = res.response_text;
          this.noData = false;
          // this.emptyArr = false;
        }else{
          // this.emptyArr = true;
          // this.displayMessage = true;
          this.noData = true;
        }
      },
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message= 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  '+ error.statusText; 
        this.isError = true;
        this.displayMessage = true;


      }
    );
  }

  showMessage() {
    this.displayMessage = false;
    // console.log('subMIS >>',this.subMIS,'noData >>',this.noData,'emptyArr >>',this.emptyArr, 'isError >>', this.isError, 'displayMessage >>', this.displayMessage);
    
    // if ( this.emptyArr == false && this.isError == false ) {
      
    //   this.noData = false;
    // } else {
    //   this.noData = true;
    // }
    this.ngZone.run(() =>{ });  
  }

  
  dateWiseMIS = true;
  betweenDatesClicked = false;
  monthlyClicked = false;
  ageingMISClicked = false;
  // subMIS = false;
  handleClick ( misType ) {
    console.log( 'misType >>', misType );
    // this.subMIS = true;
    this.exportDateWiseMIS = false;

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
      this.monthlyClicked = false;
      this.startDate=this.misReportDate;
      this.endDate=this.misReportDate;

      // this.getMISDataDetails();
    }
  }

  
  date ;
  // = new FormControl(moment());
  

  setMonthAndYear (normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.date = new FormControl(moment());
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    var _date = this.date.value;
    var date = new Date(_date), y = date.getFullYear(), m = date.getMonth();
    console.log(date, y, m);
    var firstDay = new Date(y, m, 1);
    this.startDate = this.formatDate(firstDay);
    var lastDay = new Date(y,m+1,0);
    this.endDate = this.formatDate(lastDay);
    console.log(firstDay,lastDay);
  }

  formatDate(date) {
    var formattedDate = formatDate(date.toDateString(), "dd/MM/yyyy", "en");
    return formattedDate; 
  }

  addStartDate(event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${event.value}`);
     this.startDate=`${event.value}`;
     console.log('addStartDate >>',this.startDate)
     this.startDate = formatDate(this.startDate, "dd/MM/yyyy", "en");
     console.log('addStartDate >>',this.startDate);

   }
 
   addEndDate(event: MatDatepickerInputEvent<Date>) {
     // this.events.push(`${event.value}`);
      this.endDate=`${event.value}`;
      this.endDate = formatDate(this.endDate, "dd/MM/yyyy", "en");   
   }

  //  findMonthAndYear(normalizedMonthAndYear: Moment) {
  //   const ctrlValue = this.date.value!;
  //   ctrlValue.month(normalizedMonthAndYear.month());
  //   ctrlValue.year(normalizedMonthAndYear.year());
  //   this.date.setValue(ctrlValue);
  //   var _date = this.date.value;
  //   var date = new Date(_date), y = date.getFullYear(), m = date.getMonth();
  //   console.log(date, y, m);
  //   var firstDay = new Date(y, m, 1);
  //   this.startDate = this.formatDate(firstDay);
  //   var lastDay = new Date(y,m+1,0);
  //   this.endDate = this.formatDate(lastDay);
  //   console.log(firstDay,lastDay);

  //  }

  openConfirmationBox = false;
  messagePopup;
  submitDateRange(){
      console.log('submitDateRange ::monthlyClicked', this.date, this.startDate, this.endDate);
    if (!this.startDate || !this.endDate){
      console.log('dates blank', this.date);
      // this.setStartAndEndDate();
      this.messagePopup = 'Please select period';
      this.openConfirmationBox = true;
      return;
      
    }
    else {
      this.getMISDataDetails();
    }
    
  }
  showAlert(response) {
    this.openConfirmationBox = false;
  }
  exportDateWiseMIS = false;
  dateWiseMISData;
  noDataAvailable = false;
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
    this.showOverlay = true;
    
    this.gs.getMisData(obj).subscribe(
      (response) => {
        this.messageType = 'Information Message :  ';
        // this.message = 'server [ response_code : ' + response.response_code + ' ]';
        this.message = 'Response_code : ' + response.response_code;
        this.messageDetails = response.response_message;

        this.displayMessage = true;
        var res = response;
        // this.gs.loader=false;
        this.showOverlay = false;
        this.startDate="";
        this.endDate = "";
        // alert(res.response_message);
        this.isError = false;
        if(res.response_text.length > 0){
          // this.noData = false;
          this.dateWiseMISData = res.response_text;
          this.exportDateWiseMIS = true;
          // this.emptyArr = false;
          // this.showHide = false;
          // this.es.exportAsExcelFile(res.response_text, 'mis_report');
        }else{
          // this.noData = true;
          // this.emptyArr = true;
          this.displayMessage = true;
          this.noDataAvailable = true;
  
          // alert("No data found")
        }


      },
      (error) => {
        this.showOverlay = false;
        console.log('Error occured while submitting policy : : ', new Date() + ' ' + error.status + ': ' + error.statusText);
        this.message = 'Error_code : 0 ';
        this.messageDetails = 'Error';

        this.messageType = 'Error Message :  ';
        // this.message= 'Error occured while submitting policy :'
        // this.messageDetails = error.status + '  '+ error.statusText; 

        this.isError = true;
        this.displayMessage = true;

      }

    ) ;

  }

  exportAsXLSX() {
    this.es.exportAsExcelFile(this.mis_data, 'mis_report');
    
  }

  exportMISDataAsXLSX(){
    this.es.exportAsExcelFile(this.dateWiseMISData, 'mis_report');

  }
}
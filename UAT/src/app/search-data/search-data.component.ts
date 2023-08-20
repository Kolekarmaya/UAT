import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { PayoutCalculateService } from '../Service/payout-calculate.service';
import { ProcessService } from '../Service/process.service';

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.scss']
})
export class SearchDataComponent implements OnInit {
  DateRange: boolean;
  daterange;
  max: any;

  constructor(private router: Router, private fil : PayoutCalculateService, private filter:ProcessService, 
    public es: JsontoexcelService ) { 
      var routerState = this.router.getCurrentNavigation().extras.state;
      console.log('routerState :: dashboard component ::', routerState);
        if( routerState ) {
          if( routerState['moduleId'] ) {
            this.moduleId = routerState['moduleId'];
          }
          if ( routerState['moduleName'] ) {
            this.moduleName = routerState['moduleName'];
          }
        }
       
    }
    moduleId;moduleName;
    displayFilteredData: boolean = false;
  
    noData: boolean = false;
    policyNo;
    displayedColumns = [];
       //Date variable
       maxDate: any;
       minDate: any;

  ngOnInit(): void {
    // console.log('SearchDataComponent');
    this.dateDisable();
    this.pastDateDisable();
   }

   messageType; //06-05-21
   message; //06-05-21
   messageDetails;
   responseReceived :boolean = false;
   responseText = '';
   payout_data;
   messagePopup='';
   openConfirmationBox = false;
   
   showOverlay: boolean = false;
   isError: boolean = false;
   displayMessage: boolean = false;

   startDate: string;
   endDate: string;
   addStartDate(event: MatDatepickerInputEvent<Date>) {
     this.startDate = `${event.value}`;
     this.startDate = formatDate(this.startDate, "dd/MM/yyyy", "en");
     this.DateRange=true;

   }
 
   addEndDate(event: MatDatepickerInputEvent<Date>) {
     this.endDate = `${event.value}`;
     this.endDate = formatDate(this.endDate, "dd/MM/yyyy", "en");
   }


   displayDaterange:any;
   submitDateRange(){
     this.displayDaterange = true;
      if(!this.startDate || !this.endDate) {
       this.messagePopup = 'Please enter startDate and endDate first ';
       this.openConfirmationBox = true;
       return;
     }
 
     let obj={
       module_id: this.moduleId,
       requested_by: 'Admin',
       request_action: 10,
       policyNo: this.policyNo,
       // date: this.startDate,
       moduleName: this.moduleName,
       startDate:this.startDate,
       endDate:this.endDate
 
     };
    
     let url = '/core/filterPolicyData';
     this.showOverlay = true;
     this.filter.submitDateRange(obj, url).subscribe(
       (response) =>{
         console.log('response >>', response, response.response_text);
         this.showOverlay = false;
         this.messageType = 'Information Message :  ';
         // this.message = 'server [ response_code : ' + response.response_code + ' ]';
         this.message = 'Response_code : ' + response.response_code;
         this.messageDetails = response.response_message;
         this.isError = false;
         this.responseReceived = true;
         this.displayMessage = true;
         this.displayDaterange=true;
         this.displayFilteredData=false;
         console.log('********', Object.keys(response.response_text[0]))
         if(response.displayedColumns) {
           this.displayedColumns = response.displayedColumns;
           console.log('displayedColumns >>', this.displayedColumns);
         }
         else{
           this.displayedColumns = Object.keys(response.response_text[0]);
           console.log('displayedColumns >>', this.displayedColumns);
 
         }
         if(response.response_text.length > 0){
           this.daterange = response.response_text;
           this.responseText = response.response_text;
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
         console.log('Error occured while submitting policy : : ', new Date() + ' ' + error.status + ': ' + error.statusText);
         this.message = 'Error_code : 0 ';
         this.messageDetails = 'Error';
 
         this.messageType = 'Error Message :  ';
         // this.message= 'Error occured while submitting policy :'
         // this.messageDetails = error.status + '  '+ error.statusText; 
   
       }
     );
   }
  
 
   filterData() {
     this.displayFilteredData = true;
     this.displayDaterange=false;
     if(!this.policyNo) {
       this.messagePopup = 'Please enter policy number first ';
       this.openConfirmationBox = true;
       return;
     }
 
     let obj={
       module_id: this.moduleId,
       requested_by: 'Admin',
       request_action: 9,
       policyNo: this.policyNo,
       // date: this.startDate,
       moduleName: this.moduleName
     };
     // this.showOverlay = true;
    //  this.filter.getCalculatedPayout(obj).subscribe(
    //    (response) => {
    //      console.log('response >>', response, response.response_text);
    //      console.log('********', Object.keys(response.response_text[0]))
    //      if(response.displayedColumns) {
    //        this.displayedColumns = response.displayedColumns;
    //        console.log('displayedColumns >>', this.displayedColumns);
    //      }
    //      else{
    //        this.displayedColumns = Object.keys(response.response_text[0]);
    //        console.log('displayedColumns >>', this.displayedColumns);
 
    //      }
    //      if(response.response_text.length > 0){
    //        this.payout_data = response.response_text;
    //        this.responseText = response.response_text;
    //        this.noData = false;
    //        // this.emptyArr = false;
    //      }else{
    //        // this.emptyArr = true;
    //        // this.displayMessage = true;
    //        this.noData = true;
    //      }
    //    }
 
    //  );
 
     let url = '/core/filterPolicyData';
     this.showOverlay = true;
     this.filter.sendProcess(obj, url).subscribe(
 
       (response) =>{
         console.log('response >>', response, response.response_text);
         this.showOverlay = false;
         this.messageType = 'Information Message :  ';
         // this.message = 'server [ response_code : ' + response.response_code + ' ]';
         this.message = 'Response_code : ' + response.response_code;
         this.messageDetails = response.response_message;
         this.isError = false;
         this.responseReceived = true;
         this.displayMessage = true;
         console.log('********', Object.keys(response.response_text[0]))
         if(response.displayedColumns) {
           this.displayedColumns = response.displayedColumns;
           console.log('displayedColumns >>', this.displayedColumns);
         }
         else{
           this.displayedColumns = Object.keys(response.response_text[0]);
           console.log('displayedColumns >>', this.displayedColumns);
 
         }
         if(response.response_text.length > 0){
           this.payout_data = response.response_text;
           this.responseText = response.response_text;
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
         console.log('Error occured while submitting policy : : ', new Date() + ' ' + error.status + ': ' + error.statusText);
         this.message = 'Error_code : 0 ';
         this.messageDetails = 'Error';
 
         this.messageType = 'Error Message :  ';
         // this.message= 'Error occured while submitting policy :'
         // this.messageDetails = error.status + '  '+ error.statusText; 
         this.isError = true;
         this.displayMessage = true;
 
       }
     );
   }
 
   showAlert(response) {
     this.openConfirmationBox = false;
   }
   showMessage() {
     this.displayMessage = false;
     // this.ngZone.run(() =>{ });  
   }
 
   exportAsXLSX() {
     this.es.exportAsExcelFile(this.payout_data, 'filtered_report');
     
   }
   exportAsXLSXdate() {


    this.es.exportAsExcelFile(this.daterange, 'filtered_report');
    
  }

    /* Date disable */
    dateDisable() {
      var date = new Date();
      var todayDate: any = date.getDate();
      var month: any = date.getMonth() + 1;
      var year: any = date.getFullYear();
  
      if (todayDate < 10) {
        todayDate = "0" + todayDate;
      }
  
      if (month < 10) {
        month = "0" + month;
      }
  
      this.maxDate = year + "-" + month + "-" + todayDate;
      console.log('Current date:', this.maxDate);
  
    }
  
    pastDateDisable() {
      var date = new Date();
      var todayDate: any = date.getDate();
      var month: any = date.getMonth();
      var year: any = date.getFullYear();
  
      if (todayDate < 10) {
        todayDate = "0" + todayDate;
      }
  
      if (month < 10) {
        month = "0" + month;
      }
  
      if (month < 1) {
        month = 12;
        year = year - 1;
      }
  
      this.minDate = year + "-" + month + "-" + todayDate;
      console.log('Previous month date:', this.minDate);
    }
  

 }
 



  



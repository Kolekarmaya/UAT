import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { PayoutCalculateService } from '../Service/payout-calculate.service';
import { ProcessService } from '../Service/process.service';

@Component({
  selector: 'app-rt-flag-data',
  templateUrl: './rt-flag-data.component.html',
  styleUrls: ['./rt-flag-data.component.scss']
})
export class RTFlagDataComponent implements OnInit {
  DateRange: boolean;
  daterange;

  qcFlagValues = [
    { value: 'Pass', text: 'Pass' },
    { value: 'Fail', text: 'Fail' },
  ];
  // status: any;
  // Remark: any;

  constructor(private router: Router, private fil: PayoutCalculateService, private filter: ProcessService,
    public es: JsontoexcelService) {
    var routerState = this.router.getCurrentNavigation().extras.state;
    console.log('routerState :: dashboard component ::', routerState);
    if (routerState) {
      if (routerState['moduleId']) {
        this.moduleId = routerState['moduleId'];
      }
      if (routerState['moduleName']) {
        this.moduleName = routerState['moduleName'];
      }
    }
  }
  moduleId;
  moduleName;
  displayFilteredData: boolean = false;

  noData: boolean = false;
  policyNo;
  displayedColumns = [];
  policythread: any;
  //Date variable
  maxDate: any;
  minDate: any;
  policy:any;
  Thread:any;
  //  status=['Pass', 'Fail']
  ngOnInit(): void {

    // console.log('SearchDataComponent');
    // console.log('moduleName mmmmmmm', this.moduleName);
    this.dateDisable();
    this.pastDateDisable();
    if (this.moduleName == 'Death_Module' || this.moduleName == 'Annuity_Death_Module'
      || this.moduleName == 'FLC_Module' || this.moduleName == 'Surrender_Module'
      || this.moduleName == 'LTR_Module') {
      // this.ThreadID=true;
      this.policy=true;
      this.Thread=true;

    }
    else {
      this.policy=true;
    }
   
  }

  messageType; //06-05-21
  message; //06-05-21
  messageDetails;
  responseReceived: boolean = false;
  responseText = '';
  payout_data;
  messagePopup = '';
  openConfirmationBox = false;

  showOverlay: boolean = false;
  isError: boolean = false;
  displayMessage: boolean = false;

  startDate: string;
  endDate: string;
  addStartDate(event: MatDatepickerInputEvent<Date>) {
    this.startDate = `${event.value}`;
    this.startDate = formatDate(this.startDate, "dd/MM/yyyy", "en");
    this.DateRange = true;
  }

  addEndDate(event: MatDatepickerInputEvent<Date>) {
    this.endDate = `${event.value}`;
    this.endDate = formatDate(this.endDate, "dd/MM/yyyy", "en");
  }


  status: any;
  Remark: any;
  displayDaterange: any;
  submitRTF() {
    this.displayDaterange = true;
    if (!this.policyNo) {
      this.messagePopup = 'Fill all option';
      this.openConfirmationBox = true;
      return;
    }

    let obj = {
      module_id: this.moduleId,
      requested_by: 'Admin',
      request_action: 11,
      policyNo: this.policyNo,
      // date: this.startDate,
      moduleName: this.moduleName,
      ThreadID:this.ThreadID,
      Remark: this.Remark,
      status: this.status
    };

    let url ='/core/RTFlagUpdate';
    this.showOverlay = true;
    this.filter.SubmitRTFlag(obj, url).subscribe(
      (response) => {
        console.log('response >>', response, response.response_text);
        this.showOverlay = false;
        this.messageType = 'Information Message :  ';
        // this.message = 'server [ response_code : ' + response.response_code + ' ]';
        this.message = 'Response_code : ' + response.response_code;
        this.messageDetails = response.response_message;
        this.isError = false;
        this.responseReceived = true;
        this.displayMessage = true;
        this.displayDaterange = true;
        this.displayFilteredData = false;
        console.log('********', Object.keys(response.response_text[0]))
        if (response.displayedColumns) {
          this.displayedColumns = response.displayedColumns;
          console.log('displayedColumns >>', this.displayedColumns);
        }
        else {
          this.displayedColumns = Object.keys(response.response_text[0]);
          console.log('displayedColumns >>', this.displayedColumns);

        }
        if (response.response_text.length > 0) {
          this.daterange = response.response_text;
          this.responseText = response.response_text;
          this.noData = false;
          // this.emptyArr = false;
        } else {
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
  

  PolicyNo: any;
  ThreadID: any;


  // filterData() {
  //   this.displayFilteredData = true;
  //   this.displayDaterange = false;
  //   if (!this.policyNo) {
  //     this.messagePopup = 'Please enter policy number first ';
  //     this.openConfirmationBox = true;
  //     return;
  //   }

  //   let obj = {
  //     module_id: this.moduleId,
  //     requested_by: 'Admin',
  //     request_action: 9,
  //     policyNo: this.policyNo,
  //     // date: this.startDate,
  //     moduleName: this.moduleName
  //   };


  //   let url = '/core/filterPolicyData';
  //   this.showOverlay = true;
  //   this.filter.sendProcess(obj, url).subscribe(

  //     (response) => {
  //       console.log('response >>', response, response.response_text);
  //       this.showOverlay = false;
  //       this.messageType = 'Information Message :  ';
  //       // this.message = 'server [ response_code : ' + response.response_code + ' ]';
  //       this.message = 'Response_code : ' + response.response_code;
  //       this.messageDetails = response.response_message;
  //       this.isError = false;
  //       this.responseReceived = true;
  //       this.displayMessage = true;
  //       //  this.PolicyNo=true;
  //       console.log('********', Object.keys(response.response_text[0]))
  //       if (response.displayedColumns) {
  //         this.displayedColumns = response.displayedColumns;
  //         console.log('displayedColumns >>', this.displayedColumns);
  //       }
  //       else {
  //         this.displayedColumns = Object.keys(response.response_text[0]);
  //         console.log('displayedColumns >>', this.displayedColumns);

  //       }

  //       if (response.response_text.length > 0) {
  //         this.payout_data = response.response_text;
  //         this.responseText = response.response_text;
  //         this.noData = false;
  //         // this.emptyArr = false;
  //       } else {
  //         // this.emptyArr = true;
  //         // this.displayMessage = true;
  //         this.noData = true;
  //       }
  //       //    if (this.module == 'Death_Module' || this.moduleName == 'Annuity_Death_Module' 
  //       //    || this.moduleName == 'FLC_Module'
  //       //    || this.moduleName == 'Surrender_Module' || this.moduleName == 'LTR_Module'

  //       //  ) {

  //       //   this.ThreadID=true;
  //       //  }

  //     },
  //     (error) => {
  //       this.showOverlay = false;
  //       console.log('Error occured while submitting policy : : ', new Date() + ' ' + error.status + ': ' + error.statusText);
  //       this.message = 'Error_code : 0 ';
  //       this.messageDetails = 'Error';

  //       this.messageType = 'Error Message :  ';
  //       // this.message= 'Error occured while submitting policy :'
  //       // this.messageDetails = error.status + '  '+ error.statusText; 
  //       this.isError = true;
  //       this.displayMessage = true;

  //     }
  //   );
  // }

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
    var todayDate: any = date.getDate() - 2;
    var month: any = date.getMonth() + 1;
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

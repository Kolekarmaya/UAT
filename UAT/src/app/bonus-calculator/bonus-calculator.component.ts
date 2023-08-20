import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { PayoutCalculateService } from '../Service/payout-calculate.service';



@Component({
  selector: 'app-bonus-calculator',
  templateUrl: './bonus-calculator.component.html',
  styleUrls: ['./bonus-calculator.component.scss']
})
export class BonusCalculatorComponent implements OnInit {
formDisplay:boolean=false;
dataDisplay:boolean=false;
signInForm:any;



  constructor(private router:Router, 
     private calculate : PayoutCalculateService, 
     public es: JsontoexcelService,
      private ngZone: NgZone) { 
    
  }
  
  
  showFormData: boolean = false;

  messagePopup;
  openConfirmationBox = false;
  displayedColumns;

  payoutSelected = false;
  payoutName = '';
  showOverlay: boolean = false;
  isError: boolean = false;
  displayMessage: boolean = false;
  displayedBounusColumns: string[] = [];
  bounusForm:string[]=[];
  

  ngOnInit(): void {
  
    
  }
  searchField;
  clearSearchField() {
    this.searchField = ' ';
  }
  
  
tableDisplay:boolean=false;
  submit() {
    // this.dataDisplay=true;
    let obj1={
      module_id: 109,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      payout: this.payoutName,
      policyNo: this.policyNo,
      reason:this.reason 
    };
    this.calculate.getCalBonus(obj1).subscribe(
      (response) => {
        console.log('response >>', response, response.response_text);
        this.showOverlay = false;
        this.tableDisplay=true;
        
        this.messageType = 'Information Message :  ';
        // // this.message = 'server [ response_code : ' + response.response_code + ' ]';
        this.message = 'Response_code : ' + response.response_code;
        this.messageDetails = response.response_message;
        this.isError = false;
        this.responseReceived = true;
        this.displayMessage = true;
        console.log('********', Object.keys(response.response_text[0]))
        if(response.displayedBounusColumns) {
          this.displayedBounusColumns = response.displayedBounusColumns;
          console.log('displayedBounusColumns >>', this.displayedBounusColumns);
        }
        else{
          this.displayedBounusColumns = Object.keys(response.response_text[0]);
          console.log('displayedBounusColumns >>', this.displayedBounusColumns); 
        }
        if(response.response_text.length > 0){
          this.bouns_data = response.response_text;
          this.responseText = response.response_text;
          this.noData = false;
       
        }else{
          // this.emptyArr = true;
          // this.displayMessage = true;
          this.noData = true;
        }
        
      }
    )}
    
  moduleId;
  subModuleId = 0;
  moduleName;
  hideDetails;

  reason;
  policyNo;
  DOC;
  FUP;
  Date_of_Exit;
  Plan_Id;
  Frequency;
  Term
  Mode

  messageType; 
  message; 
  messageDetails;
  responseReceived :boolean = false;
  responseText = '';
  // payout_data;
  bouns_data
  noData: boolean = false;

  

  calculateBonus() {
    console.log('policyNo >', this.policyNo, 'reason >', this.reason)
    if(!this.policyNo || !this.reason ) {
      this.messagePopup = 'Please enter policy number and reason first ';
      this.openConfirmationBox = true;
      
      return;
      
    }
    else{
      this.formDisplay=true;
    }
    let obj={
      module_id: 109,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      payout: this.payoutName,
      policyNo: this.policyNo,
      reason:this.reason 
    };
    this.showOverlay = true;
    this.calculate.getCalculateBonus(obj).subscribe(
      (response) => {
        console.log('response >>', response, response.response_text);
        this.showOverlay = false;
        this.messageType = 'Information Message :  ';
        // this.message = 'server [ response_code : ' + response.response_code + ' ]';
        this.message = 'Response_code : ' + response.response_code;
        this.messageDetails = response.response_message;
        this.isError = false;
        this.responseReceived = true;
        this.displayMessage = false;
        console.log('********', Object.keys(response.response_text[0]))
        // if(response.displayedBounusColumns) {
        //   this.displayedBounusColumns = response.displayedBounusColumns;
        //   console.log('displayedBounusColumns >>', this.displayedBounusColumns);
        // }
        // else{
        //   this.displayedBounusColumns = Object.keys(response.response_text[0]);
        //   console.log('displayedBounusColumns >>', this.displayedBounusColumns);

        // }
        if(response.response_text.length > 0){
          // this.bouns_data = response.response_text;
          this.responseText = response.response_text;
          this.noData = false;
          console.log(this.responseText[0]['DOC']);
          this.DOC = this.responseText[0]['DOC'];
          console.log(this.responseText[0]['FUP']);
          this.FUP = this.responseText[0]['FUP'];
          console.log(this.responseText[0]['Date_of_Exit']);
          this.Date_of_Exit = this.responseText[0]['Date_of_Exit'];
          console.log(this.responseText[0]['Plan_Id']);
          this.Plan_Id = this.responseText[0]['Plan_Id'];
          console.log(this.responseText[0]['Term']);
          this.Term = this.responseText[0]['Term'];
          console.log(this.responseText[0]['Mode']);
          this.Mode = this.responseText[0]['Mode'];
          console.log(this.responseText[0]['Frequency']);
          this.Frequency = this.responseText[0]['Frequency'];
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
        this.displayMessage = false;
      }

    );

  }
 
  showAlert(response) {
    this.openConfirmationBox = false;
  }
  
  showMessage() {
    this.displayMessage = false;
    this.ngZone.run(() =>{ });  
  }
  exportAsXLSX(data) {
    this.es.exportAsExcelFile(this.bouns_data, 'BonusCalculation_report');
   
}

}



import { Component, NgZone, OnInit } from '@angular/core';
// import dashboard from 'node_modules_old/@angular/material/schematics/ng-generate/dash';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { PayoutCalculateService } from '../Service/payout-calculate.service';

@Component({
  selector: 'payout-calculator',
  templateUrl: './payout-calculator.component.html',
  styleUrls: ['./payout-calculator.component.scss']
})
export class PayoutCalculatorComponent implements OnInit {

  constructor( public es: JsontoexcelService,
    private calculate : PayoutCalculateService, 
    private ngZone: NgZone) { 

    }

  // payout = 'dashboard';
  payoutSelected = false;
  payoutName = '';
  showOverlay: boolean = false;
  isError: boolean = false;
  displayMessage: boolean = false;
  displayedColumns: string[] = [];




  curr_projects = [
    'NON_ULIP_SURRENDER',
    'NON_ULIP_MATURITY',
    'ANNUITY_PAYOUT'
  ];

  curr_projects_map = {
    'NON_ULIP_SURRENDER': 1,
    'NON_ULIP_MATURITY': 2,
    'ANNUITY_PAYOUT': 3
  };

  ngOnInit(): void {
    // this.displayedColumns =
    // [ 
     

    // ];
    
  }
  

  moduleId;
  subModuleId = 0;
  moduleName;
  hideDetails;
  policyNo;

  // module; //STAMPDUTY CHANGES
  // menuenter(module, payout) {
  //   this.module = module + '_' + payout;
  //   console.log('menuenter ::' , module, payout, this.module); 
  //   // console.log('menuenter ::', this.module);
  //   this.moduleId = this.curr_projects_map[this.module];
  //   this.moduleName = module;
  //   this.subModuleId = 0;
  // }

  menuenter(payout){
    console.log('menuenter ', this.payoutSelected, payout);
    this.payoutName = payout;
    this.moduleId = this.curr_projects_map[payout];
    this.subModuleId = 0;
    this.payoutSelected = true;
    console.log('menuenter ', this.payoutSelected);    

  }

  
  messageType; //06-05-21
  message; //06-05-21
  messageDetails;
  responseReceived :boolean = false;
  responseText = '';
  payout_data;
  noData: boolean = false;
  
  openConfirmationBox = false;
  messagePopup;
  calculatePayout() {
    console.log('policyNo >', this.policyNo)
    if(!this.policyNo) {
      this.messagePopup = 'Please enter policy number first ';
      this.openConfirmationBox = true;
      return;
    }
    let obj={
      module_id:1,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      payout: this.payoutName,
      policyNo: this.policyNo
    };
    this.showOverlay = true;
    this.calculate.getCalculatedPayout(obj).subscribe(
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
    this.ngZone.run(() =>{ });  
  }
  exportAsXLSX() {
    this.es.exportAsExcelFile(this.payout_data, 'payout_report');
    
  }

}

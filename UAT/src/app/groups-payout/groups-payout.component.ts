import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DashboardService } from '../Service/dashboard.service';
import { ModuleService } from '../Service/module.service';
import { ProcessService } from '../Service/process.service';

@Component({
  selector: 'groups-payout',
  templateUrl: './groups-payout.component.html',
  styleUrls: ['./groups-payout.component.scss']
})
export class GroupsPayoutComponent implements OnInit {


  curr_projects = [
    'MATURITY', 'ANNUITY', 'DEATH', 'SURRENDER'
  ];

  curr_projects_map = {
    'MATURITY_L': 301,
    'ANNUITY_L': 302,
    'FLC_L': 303,
    'RINN_RAKSHA_D': 401,
    'DHANRAKSHA_D': 402,
    'MICRO_INSURANCE_D': 403,
    'GROUP_SWADHAN_D': 404,
    'SWARNA_GANGA_D': 405,
    'KISAN_CREDIT_CARD_D': 406,
    'SUPER_SURAKSHA_D': 407,
    'GIT_SAMPOORN_SURAKSHA_D': 408,
    'REPUDIATION_D': 409,

    'RINN_RAKSHA_S': 501,
    'DHANRAKSHA_S': 502,
    'GROUP_SWADHAN_S': 503,

    'Swadhan_L':504, //100 policy screen
    'Micro_Insurance_L':505,
    'Swarna_Ganga_L':506,
    'Swarn_Jeevan_D':507
    // 'DEATH': 401,
    // 'SURRENDER': 402
  };

  curr_process = ['PROCESS_INPUT', 'PROCESS_LOGIC', 'PROCESS_OUTPUT', 'PROCESS_OUTPUT_FLAG', 'VIEWQCDATA', 'PROCESS_CALCULATION'];
  curr_process_map = { 'PROCESS_INPUT': 1, 'PROCESS_LOGIC': 2, 'PROCESS_OUTPUT': 3, 'PROCESS_OUTPUT_FLAG': 4, 'VIEWQCDATA': 5, 'PROCESS_CALCULATION': 6 };

  constructor(private router: Router,
    private moduleService: ModuleService,
    private processService: ProcessService,
    private dash: DashboardService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  moduleId;
  subModuleId = 0;
  moduleName;
  hideDetails;

  module; //STAMPDUTY CHANGES
  menuenter(module, payout, subModule_Id?) {
    this.module = module + '_' + payout;
    console.log('menuenter ::', module, payout, this.module);
    // console.log('menuenter ::', this.module);
    this.moduleId = this.curr_projects_map[this.module];
    this.moduleName = module;
    if (subModule_Id) {
      this.subModuleId = subModule_Id;
    } else {
      this.subModuleId = 0;
    }
  }


  processQcValue;
  processId;
  dialogData;
  showOverlay = false;
  selectedPayout(process, val?, data?) {
    this.processQcValue = val;
    this.dialogData = data;

    if (process == 'VIEWQCDATA') {
      console.log(this.module, this.moduleId, this.moduleName, process, this.subModuleId);
      this.processId = this.curr_process_map[process];
      console.log('processId >>>>', this.processId);
      var params = {
        moduleId: this.moduleId,
        module: this.module,
        process: process,
        processId: this.processId,
        subModule_id: this.subModuleId,
        payout: 'Groups'
        //processId: this.curr_process_map['PROCESS_OUTPUT_FLAG'],
        //requested_by: 'Admin'
      };
      console.log('params::', params);
      this.router.navigate(['view-qcdata'], { state: params });
    }
    else {
      this.processId = this.curr_process_map[process];
      console.log('sendProcessInfo called :: processId : ', this.processId, 'moduleId :', this.moduleId, 'moduleName :', this.moduleName, 'subModule :', this.subModuleId);
      // if ((this.moduleId === 10 && this.subModuleId === 2 && this.processId === 1) || (this.moduleId === 11 && this.subModuleId === 2 && this.processId === 1)) {
      //   // this.showDateTime(this.dialogData,process);
      //  this.dialog.open(this.dialogData)

      // } 
      // else {
      // }
      this.showOverlay = true;
      this.sendProcessInfo(process);
    }
  }
  policyData_;
  exportTo;
  displayColumns;

  messageType; //06-05-21
  displayMessage = false;  //06-05-21
  message; //06-05-21
  isError = false;
  messageDetails;
  startDate: string = '';
  endDate: string = '';

  processedCases;
  showCasesProcessed = false;
  action = 'Received';


  sendProcessInfo(process: string) {
    console.log('sendProcessInfo called :: processId : ', this.processId, 'moduleId :', this.moduleId, 'moduleName :', this.moduleName, 'subModule :', this.subModuleId);

    let paramInfo = {
      'module_id': this.moduleId,
      'request_action': this.processId,
      'requested_by': 'Admin'
    };

    if (this.subModuleId > 0) {
      //'subModule_id': this.subModuleId;
      paramInfo['subModule_id'] = this.subModuleId;
    } else {
      paramInfo['subModule_id'] = 0;

    }
    if ((this.startDate && this.endDate && this.moduleId === 10 && this.subModuleId === 2 && this.processId === 1) || (this.startDate && this.endDate && this.moduleId === 11 && this.subModuleId === 2 && this.processId === 1)) {
      paramInfo['endDate'] = this.endDate;
      paramInfo['startDate'] = this.startDate;

    }
    console.log('paramInfo ::', paramInfo);
    // console.log(JSON.stringify(paramInfo));

    console.log(typeof (this.moduleId));
    console.log(typeof (this.processId));

    this.processService.sendProcessDetails(paramInfo, process).subscribe(
      (response) => {
        console.log('response received ::', response);
        this.showCasesProcessed = false;
        console.log(typeof (response));
        //  var res = response; //TODO
        //  response=[
        //    {
        //    "error_code":0,
        //    "error_message":"database error"
        //   }
        //  ]
        // response = [{
        //     "response_code":1,
        //     "response_message":"No data available",
        //     "response_text":  res
        //     //  "Count of Cases Received : 1000"
        //     // "Count of Cases Received : 100"
        //     // "displayedColumns" : ['POLICY_NO', 'THREAD_ID', 'AUDITED_NET_PAYABLE', 'AUDITED_RESULT']
        //   }
        // ] //TODO
        // response = [{
        //   "error_code":1,
        //   "error_message":"No data available",
        //   "error_text":res
        //   }
        // ]
        // var res = response;
        // console.log(res);

        // response = [
        //   {
        //     response_code: 1,
        //     response_message: 'No data available',
        //     response_text: res,
        //   },
        // ];
        if (typeof (response) == 'string') {
          response = JSON.parse(response);
        }
        if (response.length > 0) {
          response = response[0];
          console.log('response received #2::', response);
          //  console.log('response received #3::', response.error_code);
        }


        if (response.response_message) {
          console.log('response.response_code #1');
          this.isError = false;

          this.messageType = 'Information Message :  ';
          console.log('messageType >>', this.messageType);
          // this.message = 'server [ response_code : ' + response.response_code + ' ]';

          this.message = 'Response_code : ' + response.response_code;
          console.log('message >>', this.message);

          this.messageDetails = response.response_message;
          console.log('messageDetails >>>', this.messageDetails);
        } else {
          console.log('response.error_code #1');
          this.isError = true;

          this.messageType = 'Error Message :  ';
          console.log('messageType >>', this.messageType);

          // this.message = 'server [ error_code : ' + response.error_code + ' ]';
          this.message = 'Error_code : ' + response.error_code;
          console.log('message >>', this.message);

          this.messageDetails = response.error_message;
          console.log('messageDetails >>>', this.messageDetails);
          //new         
          this.displayMessage = true;
          this.showOverlay = false;
          return;

        }

        if (response) {
          //console.log('response ==>', response);
          //this.showOverlay= false;

          if (process === 'PROCESS_INPUT') {
            console.log('showOverlay >>', this.showOverlay);
            this.showOverlay = false;
            console.log('PROCESS_INPUT >>', response, this.showOverlay);
            this.displayMessage = true;
            console.log('displayMessage >>', this.displayMessage);
            this.processedCases = response.response_text;
            // this.showCasesProcessed = true;

            // if ( !this.displayMessage ){
            // }

            // if ( response.processedCases ) {
            //   this.processedCases = response.processedCases;
            //   this.showCasesProcessed = true;
            //   this.action = 'Received ';
            // }
            response['payout'] = 'groups';

            // this.router.navigate(['groups-process'], {state: response});
            //TODO add path for new component to show data
            // console.log(_paramData);
            // this.router.navigate(['dashboard'], {
            //   state: _paramData
            // });
            //alert( response );  //TODO


            // this.message = response_.response_message;
            // this.message = 'server [ error_code : ' + response_.response_code + ' ]' 
            // this.messageDetails = response_.response_message;
            //alert(response.error_message);
            //alert( response.message );                 
            //alert('Data fetched Successfully')
            //this.displayColumns = response.displayColumns;
          }
          else if (process === 'PROCESS_LOGIC') {
            console.log('showOverlay >>', this.showOverlay);
            this.showOverlay = false;
            console.log('PROCESS_LOGIC >>', response, this.showOverlay);
            //alert( response );  

            //TODO COMMENTED FOR TESTING              
            // this.policyData_ = response;//TOFO
            // this.policyData_ = response.error_message;
            // var response_ = {
            //   "response_code": '0',
            //   "response_message": 'Code execution done successfully',
            //   "response": response
            // }
            // this.message = response_.response_message;
            console.log('PROCESS_LOGIC #2>>', response.response_text);
            // this.policyData_ = response.response_text;//new
            this.displayMessage = true;
            this.processedCases = response.response_text;//new

            console.log('displayMessage >>', this.displayMessage);
            // this.processedCases = response.response_text;
            // this.showCasesProcessed = false;


            // if ( response.processedCases ) {
            //   this.processedCases = response.processedCases;
            //   this.showCasesProcessed = true;
            //   this.action = 'Processed ';
            // }


            //alert( response );  //TODO

            // this.message = response_.response_message;

            // setTimeout( () => { 
            //   if ( this.policyData_.length > 0 ) {
            //     // alert('Code execution done successfully');//TODO
            //     //alert(response.error_message);
            //   } else {
            //     // alert('No Data Available');//TODO
            //     //alert(response.error_message);
            //   }
            // }, 1000 );
            console.log('PROCESS_LOGIC policyData_ >>>', this.policyData_);
          }
          else if (process === 'PROCESS_OUTPUT') {
            console.log('showOverlay >>', this.showOverlay);
            this.showOverlay = false;
            console.log('PROCESS_OUTPUT >>', response, this.showOverlay);
            // this.policyData_=response;//TODOREMOVE
            console.log('policyData_  #2>>>', this.policyData_);
            console.log('typeof policyData_ >>', typeof (this.policyData_));

            console.log('PROCESS_OUTPUT ##::', response.response_text);//new 07-05-21

            var data = response.response_text;

            // if ( response.processedCases ) {
            //   this.processedCases = response.processedCases;
            //   this.showCasesProcessed = true;
            //   this.action = 'Available for OC ';
            // }

            if (data && data.length > 0) {
              this.policyData_ = data;
            }
            console.log('policyData_  #3>>>', this.policyData_);
            // TODO COMMENTED FOR TESTING
            if (typeof (this.policyData_) == 'string') {
              this.policyData_ = JSON.parse(this.policyData_);
            }
            var _paramData = {
              policyData: this.policyData_,
              moduleId: this.moduleId,
              processId: this.curr_process_map['PROCESS_OUTPUT_FLAG'],
              requested_by: 'Admin',
              // display_columns:(this.module=='STAMP_DUTY_NON_ULIP' ) ? this.dash.stamp_duty_display_columns : ( this.module=='NON_ULIP_PRE_CHECKING' )? this.dash.pre_checking_display_columns : this.dash.ulip_display_columns
            };

            // if( typeof( response ) == 'string' ) {
            //   this.policyData_ = JSON.parse( response );
            // }
            // setTimeout( () => { 
            //   if ( this.policyData_.length > 0 ) {
            //     alert('Code execution done successfully');
            //   } else {
            //     alert('No Data Available');
            //   }
            // }, 1000 );
            // var _paramData = {
            //   policyData : this.policyData_,
            //   moduleId : this.moduleId,
            //   processId: this.curr_process_map['PROCESS_OUTPUT_FLAG'],
            //   requested_by: 'Admin'
            // };

            console.log('module 123>>>>', this.module)

            if (this.subModuleId > 0) {
              //'subModule_id': this.subModuleId;
              _paramData['subModule_id'] = this.subModuleId;
            }
            else {
              _paramData['subModule_id'] = 0;
            }

            _paramData['payout'] = 'Groups'; //for redirecting from dashboard to menu page


            console.log('groups payout -page >>', _paramData);
            localStorage.setItem('policy', JSON.stringify(_paramData))
            // this.router.navigate(['pass-fail-approval']);
            console.log(_paramData);
            // this.router.navigate(['dashboard'], {
            //   state: _paramData
            // });

            this.router.navigate(['pass-fail-approval']);


          }
          else if (process === 'PROCESS_CALCULATION') {
            console.log('PROCESS_CALCULATION hit');
            this.showOverlay = false;
            console.log('PROCESS_LOGIC >>', response, this.showOverlay);
            this.displayMessage = true;
            this.processedCases = response.response_text;//new

            console.log('displayMessage >>', this.displayMessage);


          }
        }
      },
      (error) => {

        // this.messageType = 'Error Message :  '
        console.log('Error ::', error);
        console.log(error.status);
        console.log(error.statusText);
        this.showOverlay = false;
        this.displayMessage = true;
        this.isError = true;

        console.log('Error occured while submitting policy : : ', new Date() + ' ' + error.status + ': ' + error.statusText);
        this.message = 'Error_code : 0 ';
        this.messageDetails = 'Error';

        this.messageType = 'Error Message :  ';
        console.log('messageType >>', this.messageType);

        // this.message = 'client [ error_code : ' + error.status + ' ]';
        console.log('message >>', this.message);

        // this.messageDetails = error.statusText;
        console.log('messageDetails >>>', this.messageDetails);
        return;

        //06-05-21
        // error = {
        //   "response_code": 'ORA-00911',
        //   "response_message": error.response_code +' : ' + error.response_message
        // }
        // this.message = error.status +' : ' + error.statusText;
        // this.message = '500 ' +' : ' + 'Internal Server Error';

        // alert('Error Occurred in Process');

        // error = {
        //   "error_code": 'ORA-00911',
        //   "error_message": 'Invalid Character'
        // }
        // alert('Error ' + error.error_code + ' : ' + error.error_message);
      }
    );

    //this.router.navigate( ['dashboard'], { state : { routeParam : this.routeParam } } );
  }

  showMessage() {
    this.displayMessage = false;
    this.showCasesProcessed = true;
  }



}

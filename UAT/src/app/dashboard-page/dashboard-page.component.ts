import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MessageDialogComponent } from "../dialog/message/message.component";
import { ModuleService } from '../Service/module.service';
import { ProcessService } from '../Service/process.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from '../Service/dashboard.service';
import { stringify } from '@angular/compiler/src/util';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  /*
  curr_projects = ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5', 'Module 6',
    'Module 7', 'Module 8', 'Module 9', 'Module 10', 'Module 11', 'Module 12',
    'Module 13', 'Module 14', 'Module 15', 'Module 16', 'Module 17', 'Module 18'];
  */

  curr_projects = [
    'NON_ULIP_FLC', 'ULIP_FLC', 'ULIP_MATURITY', 'ULIP_SURRENDER',
    'NON_ULIP_SURRENDER', 'LTR', 'NON_ULIP_DEATH_CLAIM', 'ULIP_DEATH_CLAIM',
    'ULIP_MATURITY_CLAIM', 'SURVIVAL_BENEFIT', 'ANNUITY_PAYOUT', 'ANNUITY_DEATH_CLAIM',
    'STAMP_DUTY_NON_ULIP', 'STAMP_DUTY_ULIP', 'NON_ULIP_DEATH_REPUDIATION',
    'ULIP_DEATH_REPUDIATION', 'PRE_CHECKING'
  ];

  curr_projects_map = {
    'NON_ULIP_FLC': 1,
    'ULIP_FLC': 2,
    'ULIP_MATURITY': 3,
    'NON_ULIP_SURRENDER': 4,
    'ULIP_SURRENDER': 5,
    'LTR': 6,
    'NON_ULIP_DEATH_CLAIM': 7,
    'ULIP_DEATH_CLAIM': 8,
    'NON_ULIP_MATURITY_CLAIM': 9,
    'SURVIVAL_BENEFIT': 10,
    'ANNUITY_PAYOUT': 11,
    'ANNUITY_DEATH_CLAIM': 12
    , 'STAMP_DUTY_NON_ULIP': 13
    , 'STAMP_DUTY_ULIP': 14
    , 'NON_ULIP_DEATH_REPUDIATION': 15
    , 'ULIP_DEATH_REPUDIATION': 16
    , 'NON_ULIP_PRE_CHECKING': 17
    , 'INDIGO_DEATH_CLAIMS': 18
    , 'ULIP_PRE_CHECKING': 19,
    'ULIP_PRE_CHECKING_1M': 20
    , 'RT_GROUP_DEATH_CLAIMS': 21,
    'NU_Pension & VIP_Maturity': 22,
    'INDIGO_MATURITY_CLAIMS': 23
  };


  curr_process = ['PROCESS_INPUT', 'PROCESS_LOGIC', 'PROCESS_OUTPUT'];
  curr_process_map = { 'PROCESS_INPUT': 1, 'PROCESS_LOGIC': 2, 'PROCESS_OUTPUT': 3, 'PROCESS_OUTPUT_FLAG': 4, 'VIEWQCDATA': 5 };

  spliced_data = [];
  page_event = { pageIndex: 0, pageSize: 0 }

  @ViewChild('messageDlg', { static: false })
  messageDlg: MessageDialogComponent;
  signInForm: any;

  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private processService: ProcessService,
    private dash: DashboardService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    if (this.curr_projects.length <= 6) {
      this.spliced_data = this.curr_projects.slice(0).slice(0, 6);
    }
    else {
      this.spliced_data = this.curr_projects.slice(0).slice(0, 12);
    }
    console.log('spliced_data ::', this.spliced_data);
    // this.moduleService.getModules().subscribe(data => {
    //   console.log(data)
    // }, err => {
    //   console.log(err)
    // })

  }

  pageChangeEvent(event) {
    this.page_event.pageIndex = event.pageIndex
    this.page_event.pageSize = event.pageSize
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.spliced_data = this.curr_projects.slice(offset).slice(0, event.pageSize);
  }

  filterProjectName($event) {
    this.spliced_data = this.curr_projects.filter(s => s.includes($event.target.value))
    if (!$event.target.value) {
      console.log(this.page_event)
      const offset = ((this.page_event.pageIndex + 1) - 1) * this.page_event.pageSize;
      this.spliced_data = this.curr_projects.slice(offset).slice(0, this.page_event.pageSize);
    }
  }

  gotoPage(pageName: string, ele: string) {
    sessionStorage.setItem('name', ele)
    this.router.navigate([pageName])
  }

  projectInfo = {};

  sendProjectInfo(projectName: string) {
    console.log('sendProjectInfo called :: projectName : ', projectName);
    console.log(this.curr_projects_map[projectName]);
    this.projectInfo = { 'module': projectName, 'id': this.curr_projects_map[projectName] };
    console.log(this.projectInfo);

    this.router.navigate(['process'], { state: { moduleId: this.curr_projects_map[projectName] } });

  }

  // Changes for UI  
  moduleId;
  subModuleId = 0;
  moduleName;
  hideDetails;

  module; //STAMPDUTY CHANGES
  menuenter(module) {
    // console.log('menuenter ::' , module); 
    this.module = module;
    console.log('menuenter ::', this.module);
    this.moduleId = this.curr_projects_map[module];
    this.moduleName = module;
    this.subModuleId = 0;
  }

  subMenuEnter(module, subModuleId) {
    console.log('subMenuEnter ::', module, subModuleId);
    this.module = module;
    this.moduleId = this.curr_projects_map[module];
    this.moduleName = module;
    this.subModuleId = subModuleId;

  }

  processQcValue;
  processId;
  dialogData;
  selectedPayout(process, val?,data?) {
    this.processQcValue = val;
    this.dialogData=data;

    if (process == 'VIEWQCDATA') {
      console.log(this.module, this.moduleId, this.moduleName, process, this.subModuleId);
      this.processId = this.curr_process_map[process];
      console.log('processId >>>>', this.processId);
      var params = {
        moduleId: this.moduleId,
        module: this.module,
        process: process,
        processId: this.processId,
        subModule_id: this.subModuleId
        //processId: this.curr_process_map['PROCESS_OUTPUT_FLAG'],
        //requested_by: 'Admin'
      };
      console.log('params::', params);
      this.router.navigate(['view-qcdata'], { state: params });
    }
    else {
      this.processId = this.curr_process_map[process];
      console.log('sendProcessInfo called :: processId : ', this.processId, 'moduleId :', this.moduleId, 'moduleName :', this.moduleName, 'subModule :', this.subModuleId);
      if ((this.moduleId === 10 && this.subModuleId === 2 && this.processId === 1) || (this.moduleId === 11 && this.subModuleId === 2 && this.processId === 1)) {
        // this.showDateTime(this.dialogData,process);
       this.dialog.open(this.dialogData)

      } 
      else {
      this.showOverlay = true;
        this.sendProcessInfo(process);
      }
    }
  }
  showDateTime() {
    console.log(this.startDate);
    console.log(this.endDate);
    this.dialog.closeAll()
    this.sendProcessInfo('PROCESS_INPUT')
    // this.sendProcessInfo(data);

  }
  startDate:string;
  endDate:string;
  addStartDate(event: MatDatepickerInputEvent<Date>) {
     this.startDate=`${event.value}`;
     this.startDate = formatDate(this.startDate, "dd/MM/yyyy", "en");
   }
 
   addEndDate(event: MatDatepickerInputEvent<Date>) {
      this.endDate=`${event.value}`;
      this.endDate = formatDate(this.endDate, "dd/MM/yyyy", "en");  
   }
  policyData_;
  showOverlay = false;
  exportTo;
  displayColumns;

  messageType; //06-05-21
  displayMessage = false;  //06-05-21
  message; //06-05-21
  isError = false;
  messageDetails;
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
    }
    if((this.startDate && this.endDate && this.moduleId === 10 && this.subModuleId === 2 && this.processId === 1) || (this.startDate && this.endDate && this.moduleId === 11 && this.subModuleId === 2 && this.processId === 1)){
      paramInfo['endDate']=this.endDate;
      paramInfo['startDate']=this.startDate;
 
     }
    console.log('paramInfo ::', paramInfo);
    // console.log(JSON.stringify(paramInfo));

    console.log(typeof (this.moduleId));
    console.log(typeof (this.processId));

    this.processService.sendProcessDetails(paramInfo, process).subscribe(
      (response) => {
        console.log('response received ::', response);
        console.log(typeof (response));
       
       
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

          this.message = 'server [ response_code : ' + response.response_code + ' ]';
          console.log('message >>', this.message);

          this.messageDetails = response.response_message;
          console.log('messageDetails >>>', this.messageDetails);
        } else {
          console.log('response.error_code #1');
          this.isError = true;

          this.messageType = 'Error Message :  ';
          console.log('messageType >>', this.messageType);

          this.message = 'server [ error_code : ' + response.error_code + ' ]';
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
            this.showOverlay = false;
            console.log('PROCESS_INPUT >>', response);
            this.displayMessage = true;
            //alert( response );  //TODO
          }
          else if (process === 'PROCESS_LOGIC') {
            this.showOverlay = false;
            console.log('PROCESS_LOGIC >>', response);
           
            console.log('PROCESS_LOGIC #2>>', response.response_text);
            this.policyData_ = response.response_text;//new
            this.displayMessage = true;

          
            console.log('PROCESS_LOGIC policyData_ >>>', this.policyData_);
          }
          else if (process === 'PROCESS_OUTPUT') {
            this.showOverlay = false;
            console.log('PROCESS_OUTPUT >>', response);
            // this.policyData_=response;//TODOREMOVE
            console.log('policyData_  #2>>>', this.policyData_);
            console.log('typeof policyData_ >>', typeof (this.policyData_));

            console.log('PROCESS_OUTPUT ##::', response.response_text);//new 07-05-21

            var data = response.response_text;

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

            console.log('module 123>>>>', this.module)

            if (this.subModuleId > 0) {
              //'subModule_id': this.subModuleId;
              _paramData['subModule_id'] = this.subModuleId;
            }

            if (this.module == 'STAMP_DUTY_NON_ULIP' || this.module == 'STAMP_DUTY_ULIP') {
              this.router.navigate(['stampduty-dashboard'], {
                state: _paramData
              });
              console.log(_paramData);

            }
            // else if (this.module == 'LTR') {
            //   this.router.navigate(['LTRRestricationTable'], {
            //     state: _paramData
            //   });
            //   console.log(_paramData);
            // }
            else if (this.module == 'NON_ULIP_PRE_CHECKING' || this.module == 'ULIP_PRE_CHECKING_1M') {
              this.router.navigate(['prechecking-dashboard'], {
                state: _paramData
              });
              console.log(_paramData);
            }

            else if (this.module == 'ULIP_PRE_CHECKING') {
              this.router.navigate(['ulip-prechecking-dashboard'], {
                state: _paramData
              });
              console.log(_paramData);

            }
            else if ((this.module == 'SURVIVAL_BENEFIT' && this.subModuleId == 2) 
            || (this.module == 'ANNUITY_PAYOUT' && this.subModuleId == 2)) {
              this.router.navigate(['duelist-dashboard'], {
                state: _paramData
              });
            }
            // else if (this.module == 'LTR') {
            //   this.router.navigate(['LTRRestricationBulk'], {
            //     state: _paramData
            //   });
            //   console.log(_paramData);
            // }
//# pass fail builk dashboard            
            else if (this.module == 'ULIP_MATURITY' || this.module == 'NON_ULIP_MATURITY_CLAIM' || this.module == 'SURVIVAL_BENEFIT'
              || this.module == 'ANNUITY_PAYOUT' || this.module == 'NU_Pension & VIP_Maturity'
              || this.module == 'INDIGO_MATURITY_CLAIMS' || this.module == 'ULIP_SURRENDER'||this.module == 'LTR'
              || this.module == 'NON_ULIP_SURRENDER' || this.module == 'NON_ULIP_DEATH_CLAIM'  || this.module == 'ULIP_DEATH_CLAIM' 
              || this.module == 'NON_ULIP_DEATH_REPUDIATION' || this.module == 'ULIP_DEATH_REPUDIATION' 
              || this.module == 'NON_ULIP_FLC' || this.module == 'ULIP_FLC' || this.module == 'ANNUITY_DEATH_CLAIM'
// rohit changes NON_ULIP_DEATH_REPUDIATION,ULIP_DEATH_REPUDIATION
//rohit changes NON_ULIP_FLC, ULIP_FLC, ANNUITY_DEATH_CLAIM //[21-11-22] 
              ) {
              localStorage.setItem('policy', JSON.stringify(_paramData))
              this.router.navigate(['pass-fail-approval']);
              console.log(_paramData);

            }

            else {
              this.router.navigate(['dashboard'], {
                state: _paramData
              });
              console.log(_paramData);


            }
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

        this.messageType = 'Error Message :  ';
        console.log('messageType >>', this.messageType);

        this.message = 'client [ error_code : ' + error.status + ' ]';
        console.log('message >>', this.message);

        this.messageDetails = error.statusText;
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
  }


}

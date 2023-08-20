import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MessageDialogComponent } from '../dialog/message/message.component';
import { DashboardService } from '../Service/dashboard.service';
import { ModuleService } from '../Service/module.service';
import { ProcessService } from '../Service/process.service';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-rt-flag',
  templateUrl: './rt-flag.component.html',
  styleUrls: ['./rt-flag.component.scss']
})
export class RTFlagComponent implements OnInit {

  curr_projects = [
    'FLC_Module', 'Surrender_Module', 'LTR_Module', 'Death_Module',
     'Maturity_Module', 'Survival_Benefit', 'Annuity_Payout', 'Annuity_Payout_2W', 'Annuity_Death_Module'
  ];

  curr_projects_map = {
    'FLC_Module': 701,
    'Surrender_Module': 702,
    'LTR_Module': 703,
    'Death_Module':704,
    'Maturity_Module': 705,
    'Survival_Benefit': 706,
    'Annuity_Payout' :707,
   'Annuity_Payout_2W':708, 
   'Annuity_Death_Module':709
  
  };


  // curr_process = ['PROCESS_INPUT', 'PROCESS_LOGIC', 'PROCESS_OUTPUT'];
  // curr_process_map = { 'PROCESS_INPUT': 1, 'PROCESS_LOGIC': 2, 'PROCESS_OUTPUT': 3, 'PROCESS_OUTPUT_FLAG': 4, 'VIEWQCDATA': 5 };

  spliced_data = [];
  page_event = { pageIndex: 0, pageSize: 0 }

  @ViewChild('messageDlg', { static: false })
  messageDlg: MessageDialogComponent;
  userType: string;
  user_flag: string;
  PS: boolean;
  Claims: boolean;

  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private processService: ProcessService,
    private dash: DashboardService,
    public dialog: MatDialog,
    private login:LoginService
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

//***prasad sir rohit searchF 28-2-23
   
 
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
    // this.subModuleId = 0;
  }

  subMenuEnter(module, subModuleId) {
    console.log('subMenuEnter ::', module, subModuleId);
    this.module = module;
    this.moduleId = this.curr_projects_map[module];
    this.moduleName = module;
    // this.subModuleId = subModuleId;

  }

  // search button start
  submitFilterModule(module) {
    this.moduleId = this.curr_projects_map[module];
    console.log('submitFilterModule() :: moduleId ::', this.moduleId);
    // this.router.navigate(['pass-fail-approval']);
    let param = {
      'moduleId': this.moduleId,
      'moduleName': module

    }
    this.router.navigate(['RTFlagData'], { state: param });

  }
  filterClick: boolean = false;
  searchText = 'search data';
  SearchFilter() {
    console.log('filterClicked ');
    this.filterClick = true;
    this.searchText = 'clear search';
  }

  clearFilter() {
    console.log('filter cleared');
    this.filterClick = false;
  }
  // **end search


  processQcValue;
  processId;
  dialogData;
  selectedPayout(process, val?, data?) {
    this.processQcValue = val;
    this.dialogData = data;

 
    if (process == 'VIEWQCDATA') {
      console.log(this.module, this.moduleId, this.moduleName, process, this.subModuleId);
      this.processId = this.curr_projects_map[process];
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
      this.processId = this.curr_projects_map[process];
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

  startDate: string;
  endDate: string;
  addStartDate(event: MatDatepickerInputEvent<Date>) {
    this.startDate = `${event.value}`;
    this.startDate = formatDate(this.startDate, "dd/MM/yyyy", "en");
  }

  addEndDate(event: MatDatepickerInputEvent<Date>) {
    this.endDate = `${event.value}`;
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
    if ((this.startDate && this.endDate && this.moduleId === 10 && this.subModuleId === 2 && this.processId === 1) || (this.startDate && this.endDate && this.moduleId === 11 && this.subModuleId === 2 && this.processId === 1)) {
      paramInfo['endDate'] = this.endDate;
      paramInfo['startDate'] = this.startDate;

    }
    console.log('paramInfo ::', paramInfo);
    // console.log(JSON.stringify(paramInfo));

    console.log(typeof (this.moduleId));
    console.log(typeof (this.processId));

    this.processService.sendProcess(paramInfo, process).subscribe(
      (response) => {
        console.log('response received ::', response);
        console.log(typeof (response));
        var res = response; //TODO
       
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
              processId: this.curr_projects_map['PROCESS_OUTPUT_FLAG'],
              requested_by: 'Admin',
            };

    
          }
        }
      },
    
    );

    //this.router.navigate( ['dashboard'], { state : { routeParam : this.routeParam } } );
  }

  showMessage() {
    this.displayMessage = false;
  }


}

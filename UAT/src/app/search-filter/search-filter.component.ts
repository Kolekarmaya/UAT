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
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {


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
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    let userType_ = sessionStorage.getItem('userType');
    let user_flag_=localStorage.getItem('user_flag')
        // let user_flag_='CL01'

    // console.log('layout :: userType >>',  userType_);
    // console.log('layout :: user_flag >>',  user_flag_);

    if(user_flag_=='CL01'){
      this.PS=false;
      this.Claims=true;
    }
    if(user_flag_== 'PS01'){
      this.PS=true;
      this.Claims=false;

    }
    if(user_flag_== 'O'){
      this.PS=true;
      this.Claims=true;
    }
  else{
    console.log('not user find');
    
  }
    // this.moduleService.getModules().subscribe(data => {
    //   console.log(data)
    // }, err => {
    //   console.log(err)
    // })
  }

  // pageChangeEvent(event) {
  //   this.page_event.pageIndex = event.pageIndex
  //   this.page_event.pageSize = event.pageSize
  //   const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
  //   this.spliced_data = this.curr_projects.slice(offset).slice(0, event.pageSize);
  // }

  // filterProjectName($event) {
  //   this.spliced_data = this.curr_projects.filter(s => s.includes($event.target.value))
  //   if (!$event.target.value) {
  //     console.log(this.page_event)
  //     const offset = ((this.page_event.pageIndex + 1) - 1) * this.page_event.pageSize;
  //     this.spliced_data = this.curr_projects.slice(offset).slice(0, this.page_event.pageSize);
  //   }
  // }

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
    this.router.navigate(['search-data'], { state: param });

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

    // if( process == 'FILTER' ) {
    //   var params = {
    //     moduleId: this.moduleId,
    //     module: this.module,
    //     process: process,
    //     processId: this.processId,
    //     subModule_id: this.subModuleId
    //     //processId: this.curr_process_map['PROCESS_OUTPUT_FLAG'],
    //     //requested_by: 'Admin'
    //   };
    //   this.router.navigate(['payout-calculator'], { state: params });
    // }

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
        //  response=[
        //    {
        //    "error_code":0,
        //    "error_message":"database error"
        //   }
        //  ]
        // response = [{
        //   "response_code": 1,
        //   "response_message": " data available",
        //   "response_text": res
        // }
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
            this.showOverlay = false;
            console.log('PROCESS_INPUT >>', response);
            this.displayMessage = true;
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
            this.showOverlay = false;
            console.log('PROCESS_LOGIC >>', response);
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
            this.policyData_ = response.response_text;//new
            this.displayMessage = true;

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

            if (this.module == 'STAMP_DUTY_NON_ULIP' || this.module == 'STAMP_DUTY_ULIP') {
              this.router.navigate(['stampduty-dashboard'], {
                state: _paramData
              });
              console.log(_paramData);

            }
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
            else if ((this.module == 'SURVIVAL_BENEFIT' && this.subModuleId == 2) ||
              (this.module == 'ANNUITY_PAYOUT' && this.subModuleId == 2)) {
              this.router.navigate(['duelist-dashboard'], {
                state: _paramData
              });
              // console.log(_paramData);
            }
            else if (this.module == 'ULIP_MATURITY' || this.module == 'NON_ULIP_MATURITY_CLAIM' || this.module == 'SURVIVAL_BENEFIT'
              || this.module == 'ANNUITY_PAYOUT' || this.module == 'NU_Pension & VIP_Maturity'
              || this.module == 'INDIGO_MATURITY_CLAIMS' || this.module == 'ULIP_SURRENDER'
              || this.module == 'NON_ULIP_SURRENDER' || this.module == 'NON_ULIP_DEATH_CLAIM' || this.module == 'LTR' ||
              this.module == 'ULIP_DEATH_CLAIM'
              || this.module == 'NON_ULIP_DEATH_REPUDIATION'//
              || this.module == 'ULIP_DEATH_REPUDIATION'//
              // change ******           
            ) {
              // _paramData['processQcValue']=this.processQcValue;
              // _paramData['policyData'] =  _paramData['policyData'].filter(function (data) {
              //   return data.audited_result == _paramData['processQcValue']
              // })
              console.log('dashboard-page >>', _paramData);
              localStorage.setItem('policy', JSON.stringify(_paramData))
              this.router.navigate(['pass-fail-approval']);

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
        console.log('Error On : ', new Date() + ' ' + error.status + ': ' + error.statusText);

        this.message = 'Error_code : 0 ';
        this.messageDetails = 'Error';

        // if ( this.module == 'NON_ULIP_FLC' || this.module == 'ULIP_FLC') {
        //   this.message = 'client [ error_code : 0 ]';
        // } else {
        //   this.message = 'client [ error_code : ' + error.status + ' ]';
        // }
        console.log('message >>', this.message);

        // if ( this.module == 'NON_ULIP_FLC' || this.module == 'ULIP_FLC') {
        //   this.messageDetails = 'Error';
        // }
        // else {
        //   this.messageDetails = error.statusText;
        // }
        // this.message = 'client [ error_code : ' + error.status + ' ]';
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
  }

}

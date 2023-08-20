import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { DashboardService } from '../Service/dashboard.service';
import {formatDate} from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'view-qcdata',
  templateUrl: './view-qcdata.component.html',
  styleUrls: ['./view-qcdata.component.scss']
})
export class ViewQCDataComponent implements OnInit {

  displayedColumns: string[];
  table_data;
  edit_data = {}
  doc_choice = null
  doc_value = ''
  tabIndex = 0
    
  moduleId;
  module;
  process
  processId;
  subModuleId;

  groupPayout: boolean = false;

  constructor( 
      private router: Router,
      private dialog: MatDialog,
      private httpClient: HttpClient,
      private excelService: JsontoexcelService,
      private dashboardService: DashboardService ,
      private ngZone: NgZone
  )
  {
      var routerState = this.router.getCurrentNavigation().extras.state;
      console.log('routerState :: dashboard component :: ', routerState);
      if( routerState ) {
        if( routerState['moduleId'] ) {
          this.moduleId = routerState['moduleId'];
        }
        if( routerState['module'] ) {
          this.module = routerState['module'];
          console.log('module :', this.module );
        }
        if( routerState['process'] ) {
          this.process = routerState['process'];
        }
        if( routerState['processId'] ){
          this.processId = routerState['processId'];
        }
        if( routerState['subModule_id'] ) {
          this.subModuleId = routerState['subModule_id'];
        }
        if ( routerState['payout'] ) {
          this.groupPayout = true
        }
      }
  }

  ngOnInit(): void {
    this.displayedColumns = ['POLICY_NO', 'THREAD_ID', 'AUDITED_NET_PAYABLE', 'PQ_QC_FLAG', 'PQ_QC_REMARKS','QC_DATE','QC_TIME','TAT_TIME'];
  }
  ngAfterViewInit() {
  }

  noMatchFound = false;
  applyFilter(filterValue: string) {
    console.log('applyFilter ::: ', filterValue);
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    console.log('applyFilter #2::: ', filterValue);
    if( filterValue ) {
      this.table_data.data = this.data;
      this.noData = false;
    }
    else {
      if ( this.data && this.data.length == 0 ) {
        this.noData = true;
      }
      else if ( this.data && this.data.length > 10 ) {
        this.noData = false;
        this.table_data.data = this.data;
      }
      
    }
    console.log('applyFilter :: this.data >>', this.data);    

    if ( this.table_data && this.data ) {
      this.table_data.filter = filterValue;
      if ( this.table_data['filteredData'].length == 0 ) {
        //this.noData= true;
        this.noMatchFound = true;
      }
      else {
        this.noMatchFound = false;
      }
    }
  }

  searchPolicyValue;
  keyupSearchPolicy( value ) {
    console.log('keyupSearchPolicy :::', value );
    this.searchPolicyValue = value;
    this.applyFilter( value );
  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.data, 'QCDATA');
  }

  
  startDate:string;
  endDate:string;
  showAfterQCData: boolean = false;
  beforeQCData;
  afterQCData;


  addStartDate(event: MatDatepickerInputEvent<Date>) {
   // this.events.push(`${event.value}`);
    this.startDate=`${event.value}`;
    this.startDate = formatDate(this.startDate, "dd/MM/yyyy", "en");
  }

  addEndDate(event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${event.value}`);
     this.endDate=`${event.value}`;
     this.endDate = formatDate(this.endDate, "dd/MM/yyyy", "en");   
  }
  
  messageType; //06-05-21
  displayMessage = false;  //06-05-21
  message; //06-05-21
  isError = false;
  messageDetails;

  openConfirmationBox = false;
  messagePopup;
  
  submitDateRange(){
    
    if ( !this.startDate || !this.endDate ){
     
      // alert('Please select period.');
      this.messagePopup = 'Please select period';
      this.openConfirmationBox = true;
      this.showAfterQCData = false;          
      return;
    }
    
    this.dashboardService.fetchAfterQCPolicyData( this.moduleId, this.processId, this.subModuleId, this.startDate, this.endDate ).subscribe(
      (response) => { 
        
        // var res = response;
        // response = [{
        //     "response_code":1,
        //     "response_message":"Data fetched successfully",
        //     "response_text":res
        //   }
        // ]
        // response = [{
        //   "error_code":1,
        //   "error_message":"datafetched",
        //   "error_text":res
        //   }
        // ]
        // response={
        //   "response_code":0,
        //   "response_message":"Data fetched",
        //   "response_text":res
        // }
        console.log('$$$$$$$$$$$', response);
        if( typeof( response ) == 'string' ) {
          //this.data = JSON.parse( response );
          response = JSON.parse( response );
        }
        //  else {
        //   // this.data =  response;
        //   response = response;
        // }
        if(response.length > 0){
          response = response[0];
        
        }

        if ( response.response_message ){
        
          this.messageType = 'Information Message :  ';
          // this.message = 'server [ response_code : '+ response.response_code + ' ]';
          this.message = 'Response_code : '+ response.response_code;
          this.messageDetails = response.response_message; 
          this.isError = false;
          this.displayMessage = true;
          // this.showAfterQCData = true;//8-5-21

          this.data = response.response_text;
          var dataArray =[];
          // dataArray = routerState['policyData'];
          
          if(this.data.length > 0){
          // if(dataArray.length > 0){
        
            for (var i = 0; i<this.data.length; i++){
              var dataObj = {};
              var dataKeys = Object.keys(this.data[i]);
              for ( var j =0; j < dataKeys.length; j++){
                dataObj[dataKeys[j].toUpperCase()] = this.data[i][dataKeys[j]];
                
              }
              dataArray.push(dataObj);
  
            }
            this.data=dataArray;
          }
  
  

          // this.setTableData();//8-5-21
        }else {
                
          this.messageType = 'Error Message :  ';
          // this.message = 'server [ error_code : '+ response.error_code + ' ]';
          this.message = 'Error_code : '+ response.error_code ;
          this.messageDetails = response.error_message;
          this.isError = true;
          this.displayMessage = true;
          this.showAfterQCData = false;          
          return;
          // this.showAfterQCData = false;
          //new
        //  this.ngZone.run(() =>{ console.log('view refreshed modifyPolicyDetails')});       
        }
      },
      (error) => { 
           
        // alert('Error occured while fetching data');
        this.messageType = 'Error Message :  ';
        console.log('Error On : ', new Date() + ' ' + error.status + ': ' + error.statusText);

        this.message = 'Error_code : 0 ';
        this.messageDetails = 'Error';

        // if ( this.module == 'NON_ULIP_FLC' || this.module == 'ULIP_FLC') {
        //   this.message = 'client [ error_code : 0 ]';
        // } else {
        //   this.message = 'client [ error_code : ' + error.status + ' ]';
        // }
        // console.log('message >>', this.message);

        // if ( this.module == 'NON_ULIP_FLC' || this.module == 'ULIP_FLC') {
        //   this.messageDetails = 'Error';
        // }
        // else {
        //   this.messageDetails = error.statusText;
        // }
        // this.message = 'client [ error_code : ' + error.status + ' ]';
        // this.messageDetails = error.statusText;

        this.isError = true;
        this.showAfterQCData = false;         
        this.displayMessage = true;
        return;

      }
    );  
  }

  showMessage(){
    this.displayMessage = false;
    // this.showAfterQCData = true;
    if(this.isError == false){
      this.setTableData();
      this.showAfterQCData = true;

    }
  }

  showAlert(response) {
    this.openConfirmationBox = false;
  }

  noData: boolean = false;
  data: any;
  setTableData() {
    let data_ = [];
    this.table_data = new MatTableDataSource(data_);
    
    this.ngZone.run(() =>{ console.log('view refreshed')});

    if (this.data) {
      if (this.data.length == 0) {
        this.noData = true;
      }else{
        this.noData = false;
      }
    }
    this.table_data.data = this.data; 

  }

  hideDetails;
  checkClass() {
    if ( this.hideDetails )  {
      return 'visible';
    }
  }

}

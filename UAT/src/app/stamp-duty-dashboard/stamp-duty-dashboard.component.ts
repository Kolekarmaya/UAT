import { Component, OnInit, TemplateRef, NgZone, ViewChild   } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from "@angular/router";
import { MessageDialogComponent } from "../dialog/message/message.component";
import { HttpClient } from '@angular/common/http';
import { JsontoexcelService } from '../Service/jsontoexcel.service';

@Component({
  selector: 'app-stamp-duty-dashboard',
  templateUrl: './stamp-duty-dashboard.component.html',
  styleUrls: ['./stamp-duty-dashboard.component.scss']
})
export class StampDutyDashboardComponent implements OnInit {

  displayedColumns: string[];
  table_data;
  edit_data = {}
  doc_choice = null
  doc_value = ''
  tabIndex = 0

  data: any;
  moduleId;
  requested_by;
  processId;

  constructor( 
      private router: Router,
      private dialog: MatDialog,
      private httpClient: HttpClient,
      private excelService: JsontoexcelService,
      private ngZone: NgZone
    )
  {
      var routerState = this.router.getCurrentNavigation().extras.state;
      console.log('routerState :: dashboard component :: ', routerState);
      if( routerState ) {
        if( routerState['policyData'] ) {
          var dataArray =[];
          this.data = routerState['policyData'];

          if(this.data.length > 0){
            
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
        }
        if( routerState['moduleId'] ) {
          this.moduleId = routerState['moduleId'];
        }
        if( routerState['requested_by'] ) {
          this.requested_by = routerState['requested_by'];
          console.log('requested_by :', this.requested_by );
        }
        if( routerState['processId'] ) {
          this.processId = routerState['processId'];
        }
        // if( routerState['displayColumns']){
        //   this.displayedColumns = routerState['displayColumns'];
        // }
        
      }
  }

  ngOnInit(): void {
    this.edit_data = {};
    this.displayedColumns = ['POL_ID', 'CVG_SUM_INS_AMT', 'PLAN_ID', 'MUDRANK_DEDUCT_AMT', 'UIN', 'BASIC_PREMIUM', 'AUTOMATED_AMOUNT', 'RESULT'];
    this.setTableData();
  }
  ngAfterViewInit() {
  }

  noData: boolean = false;
  setTableData() {
    this.ngZone.run(() =>{ console.log('view refreshed')});
  
    if (this.data) {
      console.log(this.data.length);
      if (this.data.length == 0) {
        this.noData = true;
      }
    }
    let data_ = [];
    this.table_data = new MatTableDataSource(data_);
    //this.table_data.data = this.data; TODO Commented
    
    if( this.data && this.data.length > 10 ) {
      this.table_data.data = this.data.slice(0,10);
    }else{
      this.table_data.data = this.data;
    }
   
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
        this.table_data.data = this.data.slice(0,10);
      }
      else if ( this.data && this.data.length <= 10 ) {
        this.noData = false;
        this.table_data.data = this.data;
      }
    }
   

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
    console.log('this.table_data ::',this.table_data); 
  }

  searchPolicyValue;
  keyupSearchPolicy( value ) {
    this.searchPolicyValue = value;
    this.applyFilter( value );
  }

  //TODO : Use If want to search policies on click of search
  searchPolicyDetails () {
    console.log('searchPolicyDetails ::: searchPolicyValue >>', this.searchPolicyValue);
    this.applyFilter( this.searchPolicyValue );

  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.data, 'Stamp_Duty');
  }


}

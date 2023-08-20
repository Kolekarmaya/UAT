import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../Service/dashboard.service';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-duelist-approval',
  templateUrl: './duelist-approval.component.html',
  styleUrls: ['./duelist-approval.component.scss']
})
export class DuelistApprovalComponent implements OnInit {
  displayedColumns: string[];
  table_data;
  data = [];
  doc_choice = null;
  doc_value = '';
  tabIndex = 0;
  moduleId;
  requested_by;
  processId;
  exportTo;
  hideDetails;
  subModuleId;
  remarksValues: any;
  routerState;
  selection;
  bulkMessagePopup;
  openBulkBox: boolean = false;
  qcFlag = '';
  qcRemarks = '';
  selectedQcFlag: string;
  noData: boolean = false;
  openConfirmationBox = false;
  messagePopup;
  showMessageButton = false;
  processedPolicy;
  inputDisabled = false;
  bulkData = [];
  retVal = false;
  policyData = {};
  isError = false;
  displayMessage = false;
  messageType;
  messageDetails;
  message;
  noMatchFound = false;
  searchPolicyValue;
  newArray;
  blockPrevious:boolean=false;
  newData;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private router: Router,
    private httpClient: HttpClient,
    private excelService: JsontoexcelService,
    private dashboardService: DashboardService,
    private ngZone: NgZone) {

      this.routerState = this.router.getCurrentNavigation().extras.state;
      console.log('routerState :: dashboard component :: ', this.routerState);
      this.newData = this.routerState;
      console.log(this.newData);
  
      if (this.routerState) {
        if (this.routerState['policyData']) {
          var dataArray = [];
          this.data = this.routerState['policyData'];
          // dataArray = routerState['policyData'];
          console.log(this.data);
  
          if (this.data.length > 0) {
            for (var i = 0; i < this.data.length; i++) {
              // console.log(this.data[i]);
              if (this.routerState['processQcValue'] == 'PASS') {
                this.data[i]['PQ_QC_FLAG'] = 'Pass';
                this.data[i]['PQ_QC_REMARKS'] = 'Clear Case';
                this.data[i]['EDIT'] = true;
              }
             
              var dataObj = {};
              var dataKeys = Object.keys(this.data[i]);
              for (var j = 0; j < dataKeys.length; j++) {
                dataObj[dataKeys[j].toUpperCase()] = this.data[i][dataKeys[j]];
              }
              // console.log(dataArray);
  
              dataArray.push(dataObj);
            }
            this.data = dataArray;
            console.log(this.data);
  
  
          }
        }
        if (this.routerState['moduleId']) {
          this.moduleId = this.routerState['moduleId'];
        }
        if (this.routerState['requested_by']) {
          this.requested_by = this.routerState['requested_by'];
          console.log('requested_by :', this.requested_by);
        }
        if (this.routerState['processId']) {
          this.processId = this.routerState['processId'];
        }
        if (this.routerState['subModule_id']) {
          this.subModuleId = this.routerState['subModule_id'];
        }
      }

     }

  ngOnInit(): void {
    this.displayedColumns = [
      'POLICY_NO',
      'THREAD_ID',
      'AUDITED_NET_PAYABLE',
      'PQ_QC_FLAG',
      'PQ_QC_REMARKS',
      'EXPECTED',
      'actionsColumn',
    ];
    this.remarksValues = this.dashboardService.qcRemarksValues;
    this.setTableData();
  }

  dataSource;

  setTableData() {
    setTimeout(() => {
      if (
        this.routerState &&
        this.routerState['moduleId'] &&
        this.routerState['moduleId'] === 12
      ) {
        this.remarksValues = this.dashboardService.annuity_death_claims;
        return;
      } else if (
        this.routerState &&
        this.routerState['moduleId'] &&
        this.routerState['moduleId'] === 8
      ) {
        this.remarksValues = this.dashboardService.ulip_approved_death_claims;
        return;
      } else if (
        this.routerState &&
        this.routerState['moduleId'] &&
        this.routerState['moduleId'] === 16
      ) {
        this.remarksValues = this.dashboardService.ulip_repudiated_death_claims;
        return;
      } else if (
        this.routerState &&
        this.routerState['moduleId'] &&
        this.routerState['moduleId'] === 7
      ) {
        this.remarksValues =
          this.dashboardService.non_ulip_approved_death_claims;
        return;
      } else if (
        this.routerState &&
        this.routerState['moduleId'] &&
        this.routerState['moduleId'] === 15
      ) {
        this.remarksValues =
          this.dashboardService.non_ulip_repudiated_death_claims;
        return;
      }
       else if (
        this.routerState &&
        this.routerState['moduleId'] &&
        this.routerState['moduleId'] == 18
      ) 
      {
        this.remarksValues = this.dashboardService.indigo_death_claims;
        return;
      } 
      else if(this.routerState && this.routerState['moduleId'] && this.routerState['moduleId']==23){
        this.remarksValues=this.dashboardService.indigo_death_claims
  return
      }
      else if (
        this.routerState &&
        this.routerState['moduleId'] &&
        this.routerState['moduleId'] === 21
      ) {
        this.remarksValues = this.dashboardService.rt_group_death_claims;
        return;
      }
      else if (
        this.routerState &&
        this.routerState['moduleId'] &&
        this.routerState['moduleId'] === 3 || this.routerState['moduleId'] === 9
      ) {
        this.remarksValues = this.dashboardService.ulip_non_ulip_maturity;
        return;
      } 
      else {
        this.remarksValues = this.dashboardService.qcRemarksValues;
      }
    }, 100);
    console.log('setTableData called', this.data);
    this.ngZone.run(() => {
      console.log('view refreshed');
    });
    if (this.data) {
      if (this.data.length == 0) {
        this.noData = true;
      }
    }
    this.dataSource = new MatTableDataSource(this.data);
    console.log(this.dataSource);
    setTimeout(() => {
    this.dataSource.paginator = this.paginator;
      
    }, 100);
  
  }

  checkClass() {
    if (this.hideDetails) {
      return 'visible';
    }
  }

  gotoPage(pageName: string) {
    this.router.navigate([pageName]);
  }

   applyFilter(filterValue: string) {
    console.log('applyFilter ::: ', filterValue);
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    console.log('applyFilter #2::: ', filterValue);
    if (filterValue) {
      this.dataSource.data = this.data;
      this.noData = false;
    } else {
      if (this.data && this.data.length == 0) {
        this.noData = true;
      } 
    }

    if (this.dataSource && this.data) {
      this.dataSource.filter = filterValue;
      if (this.dataSource['filteredData'].length == 0) {
        this.noMatchFound = true;
      } else {
        this.noMatchFound = false;
      }
    }
  }


  keyupSearchPolicy(value) {
    this.searchPolicyValue = value;
    this.applyFilter(value);
  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.data, 'policyDetails');
  }

}

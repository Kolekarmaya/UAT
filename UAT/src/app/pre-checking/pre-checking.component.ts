import { Component, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from "@angular/router";
import { MessageDialogComponent } from "../dialog/message/message.component";
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { DashboardService } from '../Service/dashboard.service';
import { formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-pre-checking',
  templateUrl: './pre-checking.component.html',
  styleUrls: ['./pre-checking.component.scss']
})
export class PreCheckingComponent implements OnInit {
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

  transaction_list = []
  master_list = []
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private excelService: JsontoexcelService,
    private ngZone: NgZone,
    private http: HttpClient
  ) {
    var routerState = this.router.getCurrentNavigation().extras.state;
    console.log('routerState :: dashboard component :: ', routerState);
    if (routerState) {
      if (routerState['policyData']) {
        var dataArray = [];
        this.data = routerState['policyData'];

        if (this.data.length > 0) {
         this.master_list = this.data[0]["master_list"]
          this.transaction_list = this.data[0]["transaction_list"];
          this.displayedColumns= this.data[0]['displayedColumns'];
        this.data = this.master_list
         
        if(this.data){
          for (var i = 0; i < this.data.length; i++) {
            var dataObj = {};
            var dataKeys = Object.keys(this.data[i]);
            for (var j = 0; j < dataKeys.length; j++) {
              dataObj[dataKeys[j].toUpperCase()] = this.data[i][dataKeys[j]];

            }
            // console.log('dataObj ##>>', dataObj);
            dataArray.push(dataObj);

          }
        }
         
          this.data = dataArray;

        }
      }
      if (routerState['moduleId']) {
        this.moduleId = routerState['moduleId'];
      }
      if (routerState['requested_by']) {
        this.requested_by = routerState['requested_by'];
        console.log('requested_by :', this.requested_by);
      }
      if (routerState['processId']) {
        this.processId = routerState['processId'];
      }
     
    }
    
  }

  ngOnInit(): void {
    this.edit_data = {};
    // this.displayedColumns = ['POL_ID', 'ID', 'PLAN_ID', 'EXIT_DATE', 'OPN_BAL_DATE', 'OPENING_BAL_PRINCIPAL','CLOSING_BAL_TOTAL', 'PRE_CHECK_FLAG'];
    this.setTableData();

  }

  tabel_cell_data(data:any,type:any){
    return data[type]
      }
  ngAfterViewInit() {
    this.table_data.paginator =this.paginator
  }

  noData: boolean = false;
  setTableData() {

    this.ngZone.run(() => { console.log('view refreshed') });
    if (this.data) {
      console.log(this.data.length);
      if (this.data.length == 0) {
        this.noData = true;
      }
    }
    let data_ = [];
    this.table_data = new MatTableDataSource(this.data);

  }

  noMatchFound = false;
  applyFilter(filterValue: string) {

    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    if (filterValue) {
      this.table_data.data = this.data;
      this.noData = false;
    }
    else {
      if (this.data && this.data.length == 0) {
        this.noData = true;
      }
      else if (this.data && this.data.length > 10) {
        this.noData = false;
        this.table_data.data = this.data.slice(0, 10);
      }
      else if (this.data && this.data.length <= 10) {
        this.noData = false;
        this.table_data.data = this.data;
      }
    }
   

    if (this.table_data && this.data) {
      this.table_data.filter = filterValue;
      if (this.table_data['filteredData'].length == 0) {
        //this.noData= true;
        this.noMatchFound = true;
      }
      else {
        this.noMatchFound = false;
      }
    }
  }

  searchPolicyValue;
  keyupSearchPolicy(value) {
    this.searchPolicyValue = value;
    this.applyFilter(value);
  }

  //TODO : Use If want to search policies on click of search
  searchPolicyDetails() {
    console.log('searchPolicyDetails ::: searchPolicyValue >>', this.searchPolicyValue);
    this.applyFilter(this.searchPolicyValue);

  }

  exportAsXLSX(type) {
    if(type=='master_list'){
      this.excelService.exportAsExcelFile(this.master_list, 'Prechecking_Master_List');
       return
    }
    else{
      
      this.excelService.exportAsExcelFile(this.filteredData, 'Prechecking_Transaction_List');
    }

  }
 

  searchByPolicyId(val) {
    this.filterDataByPolicyId(val)
  }
  filteredData;

  filterDataByPolicyId(id) {
    this.filteredData = this.transaction_list.filter(function (data) {
      return data.pol_id == id
    })
    console.log(this.filteredData);

  }

}

import { Component, NgZone, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { error } from 'protractor';
import { ProcessService } from '../Service/process.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})

export class QueryComponent implements OnInit {
 
 // dataSource = ELEMENT_DATA;
  dataSource = []
  noData:boolean = false
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
    private processService: ProcessService,private ngZone: NgZone    
    ) { 
      this.processService.getMISDashboardDetails( ).subscribe(
        (response) => { 
          console.log('response received ::', response)
          if ( response ){
            var dataArray =[];
            this.data = response
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
            this.setTableData();      

          }
        },
        (error) => {
          console.log('error received ::', error)
        }
      );
     }


  ngOnInit(): void {
    this.displayedColumns = ['TOTAL_CLAIMS_FOR_RT', 'UIN'];    

  }
  searchPolicyValue;
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
  
    if (this.data && this.data.length > 10) {
      this.table_data.data = this.data.slice(0, 10);
 
    } else {
      this.table_data.data = this.data;
    }
  }
  keyupSearchPolicy( value ) {
    console.log('keyupSearchPolicy :::', value );
    this.searchPolicyValue = value;
    this.applyFilter( value );

  }
  noMatchFound = false;

  applyFilter(filterValue: string) {
    console.log('applyFilter ::: ', filterValue);
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
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
        this.noMatchFound = true;
      }
      else {
        this.noMatchFound = false;
      }
    }
    console.log('this.table_data ::',this.table_data); 
  }

}

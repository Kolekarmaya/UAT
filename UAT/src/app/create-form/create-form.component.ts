import {Component, OnInit, TemplateRef, ViewChildren, QueryList} from '@angular/core';
import { MatDialog, MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  
  displayedColumns: string[];
  table_data;
  output_table_data;
  module_name: string;
  edit_data = {}
  status_flag = false;
  set_status = false
  tabIndex = 0
  output_flag = true
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  constructor(private router: Router,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.set_status = false
    this.tabIndex = 0
    this.output_flag = true
    this.module_name = sessionStorage.getItem('name')
    this.displayedColumns = ['col_1', 'col_2', 'col_3', 'status']
    let data = []
    data = [
      {col_1: '123', col_2: 'abc', col_3: 'some data', status: null},
      {col_1: '456', col_2: 'def', col_3: 'some data', status: null},
      {col_1: '789', col_2: 'ghi', col_3: 'some data', status: null},
      {col_1: '123', col_2: 'abc', col_3: 'some data', status: null},
      {col_1: '456', col_2: 'def', col_3: 'some data', status: null},
      {col_1: '789', col_2: 'ghi', col_3: 'some data', status: null}                                                                                                                                                        
    ]
    let out_data = []
    out_data = [
      {col_1: '123', col_2: 'abc', col_3: 'some data', status: null},
      {col_1: '456', col_2: 'def', col_3: 'some data', status: null},
      {col_1: '789', col_2: 'ghi', col_3: 'some data', status: null},
      {col_1: '123', col_2: 'abc', col_3: 'some data', status: null},
      {col_1: '456', col_2: 'def', col_3: 'some data', status: null}                                                                                                                                                      
    ]
    this.table_data = new MatTableDataSource(data)
    this.output_table_data = new MatTableDataSource(out_data)
    this.edit_data = {}
  }

  ngAfterViewInit() {
    this.table_data.paginator = this.paginator.toArray()[0];
    this.output_table_data.paginator = this.paginator.toArray()[1];
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>, element) {
    if (element.status == null) {
      this.set_status = false
    }
    this.edit_data = element
    let config = {
      position: {
        top: '0px',
        right: '0px'
      },
      height: '100%',
      width: '50vw',
      panelClass: 'full-screen-modal',
    };
    this.dialog.open(templateRef, config)
  }

  edit() {
    this.dialog.closeAll()
  }

  gotoPage(pageName: string) {
    this.router.navigate([pageName])
  }

  statusSet(flag: boolean) {
    this.status_flag = flag
    this.set_status = true
  }

  submit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.table_data.filter = filterValue;
  }

  applyFilterOutput(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.output_table_data.filter = filterValue;
  }

  processInput() {
    this.output_flag = false
    this.tabIndex = 1
  }
}

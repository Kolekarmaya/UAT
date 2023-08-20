import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from '../global.service';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
export interface PeriodicElement {
  productType: string;
  uin: string;
  productName: string;
  productCode: string;
  dateOfLaunching: string;
  seriesNumber: Number
}
@Component({
  selector: 'app-product-mis',
  templateUrl: './product-mis.component.html',
  styleUrls: ['./product-mis.component.scss']
})

export class ProductMisComponent implements OnInit {
  productType = ['Ulip', 'Non-ulip', 'Annuity', 'Group Product'];
  department = ['NB', 'UW', 'PS', 'Claims', 'Group Ops', 'Finance', 'IT'];
  moduleStatus = ['DEV', 'UAT', 'MOVED TO PRODUCTION', 'OPEN WITH IT'];
  stakeHolderName = ['DXC', 'PIO', 'PQ', 'User Dept'];
  displayedColumns: string[] = ['PRODUCT_TYPE', 'UIN', 'PRODUCT_NAME', 'PRODUCT_CODE', 'DATE_OF_LAUNCH', 'SERIES_NO'];
  dataSource: any;
  selectedStatus: any
  constructor(public gs: GlobalService, public es: JsontoexcelService) { }
  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  exportAsXLSX() {
    this.es.exportAsExcelFile(this.dataSource._data._value, 'policyDetails');
  }
  show: boolean = false
  fetchData() {
    this.gs.loader = true
    this.show = true
    let obj = {
      "DEV": this.selectedStatus.includes('DEV'),
      "UAT": this.selectedStatus.includes('UAT'),
      "MOVED TO PRODUCTION": this.selectedStatus.includes('MOVED TO PRODUCTION'),
      "OPEN WITH IT": this.selectedStatus.includes('OPEN WITH IT'),
      filterType: 'mis'
    }

    console.log(obj);
    this.gs.fetchProductData(obj).subscribe(res => {
      this.gs.loader = false
      console.log(res);

      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    })
  }

}

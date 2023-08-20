import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})

export class ProductDashboardComponent implements OnInit {
  binding:any
    constructor(public gs:GlobalService) { }
    options = ['new-product', 'existing-product', 'mis'];
    ngOnInit(): void {
    
    }
  
  
  }

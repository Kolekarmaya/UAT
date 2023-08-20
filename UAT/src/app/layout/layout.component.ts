// Copyright (C) 2019-2020 NSEIT Limited, Mumbai. All rights reserved.
//
// This program and the accompanying materials are made available
// under the terms described in the LICENSE file which accompanies
// this distribution. If the LICENSE file was not attached to this
// distribution or for further clarifications, please contact
// legal@nseit.com.
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  userType = '';

  constructor(private router: Router, private login:LoginService) {
  }
  dashboard: boolean = false;
  groupsDashboard: boolean = false;
  checker : boolean=false;

  payoutplatform: string = '';
 ngOnInit() {

//prasad sir rohit searchF
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    let userType_ = sessionStorage.getItem('userType');
    let user_flag_=localStorage.getItem('user_flag')
    console.log('layout :: user >>',  userType_);
    console.log('layout :: user_flag >>',  user_flag_);
    
    if(userType_=='Tester'){
      this.checker=true;
    }
    if ( userType_ ) {
      this.userType = userType_;        
    }
    else {
      this.userType = 'Admin';        
    }
    if ( (this.router.url).includes('dashboard-page') ) {
      this.dashboard = true;
      // this.router.navigate(['dashboard-page']);
    } else if ( (this.router.url).includes('groups-payout') ) {
      this.groupsDashboard = true;
      // this.router.navigate(['groups-payout']);
    }
    console.log('layout 2 :: userType >>', this.userType,this.router.url);
    localStorage.setItem("user_type",this.userType);


    if (this.router.url.includes('groups-payout')){
      this.payoutplatform = 'SBI-life Group payout checking';
    }
    else if (this.router.url.includes('reinsurance-dashboard')){
      this.payoutplatform = 'SBILIFE Reinsurance Payout Platform';
    }
    else {
      console.log('layout component :: realtime dashboard url')
      this.payoutplatform = 'SBILife Payout Checking Platform';
    }
  }

  logout() {
  }

  selectHomePage(){
    console.log('selectHomePage ');
    if ( this.dashboard === true ) {
      this.router.navigate(['dashboard-page']);
    } else if ( this.groupsDashboard === true ) {
      this.router.navigate(['groups-payout']);
    }
  }

  gotoPage(pageName: string) {
    this.router.navigate([pageName]);
  }
  gotoPage1(bonus: string) {
    this.router.navigate([bonus]);
  }
}





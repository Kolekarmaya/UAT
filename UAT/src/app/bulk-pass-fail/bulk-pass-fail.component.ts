import {
  Component,
  OnInit,
} from '@angular/core';

import { Router } from '@angular/router';
import { JsontoexcelService } from '../Service/jsontoexcel.service';


@Component({
  selector: 'app-bulk-pass-fail',
  templateUrl: './bulk-pass-fail.component.html',
  styleUrls: ['./bulk-pass-fail.component.scss']
})
export class BulkPassFailComponent implements OnInit {
  routerState;
  newArray;
  noData: boolean = false;
  groupPayout: boolean = false;
  policyData: any;
  payout: any;

  constructor(private router: Router, private excelService: JsontoexcelService,) {
      this.newArray = this.router.getCurrentNavigation().extras.state;
      console.log(this.newArray);
      console.log(this.policyData)
      this.routerState = localStorage.getItem('policy')
      this.routerState=JSON.parse(this.routerState)
      console.log('routerState :: dashboard component :: ', this.routerState);
      console.log(this.routerState)
      if ( this.routerState && this.routerState['payout'] ) {
        this.groupPayout = true;
      }
      if((this.routerState && !this.routerState['policyData']) || (this.routerState && this.routerState['policyData'].length==0)){
        this.noData=true
      }
     }

  ngOnInit(): void {
   
  }
  navigateToUrl(val){
    let newArray;
    if(this.newArray && this.newArray['policyData']){
      newArray=this.newArray['policyData'];
    }
    let routerData=this.routerState['policyData'];
    if(newArray && routerData){
      var uniqueResultArrayObjOne = routerData.filter(function(objOne) {
        return !newArray.some(function(objTwo) {
            return objOne.policy_no == objTwo.policy_no;
        });
      });

    }
   if(uniqueResultArrayObjOne && uniqueResultArrayObjOne.length){
     this.routerState['policyData']=uniqueResultArrayObjOne
   }
    console.log(this.routerState);
    
    console.log(this.routerState['policyData']);
  localStorage.setItem('policy',JSON.stringify(this.routerState))
    if(this.routerState){
      this.routerState['processQcValue']=val;
      this.routerState['policyData'] =  this.routerState['policyData'].filter(function (data) {
        return data.audited_result == val
      })
      this.router.navigate( ['bulk-approval-dashboard'], { state : this.routerState
      } );
    }
  //  else if(this.routerState){
  //     this.routerState['processQcValue']=val;
  //     this.routerState['policyData'] =  this.routerState['policyData'].filter(function (data) {
  //       return data.audited_result == val
  //     })
  //     this.router.navigate( ['bulk-approval-dashboard'], { state : this.routerState
  //     } );
  //   }

  // else if (this.module == 'ULIP_MATURITY' || this.module == 'NON_ULIP_MATURITY_CLAIM' || this.module == 'SURVIVAL_BENEFIT') {
  //             localStorage.setItem('policy', JSON.stringify(_paramData))
  //             this.router.navigate(['pass-fail-approval']);
  //             console.log(_paramData);

  //           }
// console.log(this.routerState);

                
  }
  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.routerState['policyData'], 'policyDetails');
  }

}

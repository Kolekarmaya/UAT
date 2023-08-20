import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsontoexcelService } from '../Service/jsontoexcel.service';

@Component({
  selector: 'app-duelist-pass-fail',
  templateUrl: './duelist-pass-fail.component.html',
  styleUrls: ['./duelist-pass-fail.component.scss']
})
export class DuelistPassFailComponent implements OnInit {
  routerState;
  noData: boolean = false;
  newArray;

  constructor(private router: Router, private excelService: JsontoexcelService) { 
    this.routerState = this.router.getCurrentNavigation().extras.state;
    console.log('routerState :: dashboard component :: ', this.routerState);
    if(this.routerState['policyData'].length==0){
      this.noData=true
    }
  }

  ngOnInit(): void {
  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.routerState['policyData'], 'policyDetails');
  }


  navigateToUrl(val){
  //   let newArray;
  //   if(this.newArray && this.newArray['policyData']){
  //     newArray=this.newArray['policyData'];
  //   }
  //   let routerData=this.routerState['policyData'];
  //   if(newArray && routerData){
  //     var uniqueResultArrayObjOne = routerData.filter(function(objOne) {
  //       return !newArray.some(function(objTwo) {
  //           return objOne.policy_no == objTwo.policy_no;
  //       });
  //     });

  //   }
  //  if(uniqueResultArrayObjOne && uniqueResultArrayObjOne.length){
  //    this.routerState['policyData']=uniqueResultArrayObjOne
  //  }
    console.log(this.routerState);
    console.log(this.routerState['policyData']);
    if(this.routerState){
      this.routerState['processQcValue']=val;
      this.routerState['policyData'] =  this.routerState['policyData'].filter(function (data) {
        return data.audited_result == val
      })
      this.router.navigate( ['duelist-approval'], { state : this.routerState
      } );
    }
console.log(this.routerState);          
  }


}

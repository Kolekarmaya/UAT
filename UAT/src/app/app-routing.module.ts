import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ProcessPageComponent } from './process-page/process-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { StampDutyDashboardComponent } from './stamp-duty-dashboard/stamp-duty-dashboard.component';
import { ViewQCDataComponent } from './view-qcdata/view-qcdata.component';
import { PreCheckingComponent } from './pre-checking/pre-checking.component';
import { UlipPrecheckingComponent } from './ulip-prechecking/ulip-prechecking.component';
import { QueryComponent } from './query/query.component';
import { BulkApprovalComponent } from './bulk-approval/bulk-approval.component';
import { BulkPassFailComponent } from './bulk-pass-fail/bulk-pass-fail.component';
import { DuelistPassFailComponent } from './duelist-pass-fail/duelist-pass-fail.component';
import { DuelistApprovalComponent } from './duelist-approval/duelist-approval.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ExistingProductComponent } from './existing-product/existing-product.component';
import { ProductMisComponent } from './product-mis/product-mis.component';
import { MisReportComponent } from './mis-report/mis-report.component';
import { GroupsPayoutComponent } from './groups-payout/groups-payout.component';
import { PayoutCalculatorComponent } from './payout-calculator/payout-calculator.component';
import { LayoutComponent } from './layout/layout.component';
import { BonusCalculatorComponent } from './bonus-calculator/bonus-calculator.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SearchDataComponent } from './search-data/search-data.component';
import { RTFlagComponent } from './rt-flag/rt-flag.component';
import * as path from 'path';
import { RTFlagDataComponent } from './rt-flag-data/rt-flag-data.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  { path: 'home', pathMatch: 'full', redirectTo: 'login' },
  {
    path: '',
    component: LayoutComponent,
    // canActivateChild: [AuthGuard],
    children: [
      {
        // path: 'dashboard',
        // component: DashboardComponent,
		    path: 'dashboard-page',
        component: DashboardPageComponent, 
      },
      {
        path: '',
        //component: DashboardComponent,
        component: DashboardPageComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'process',
        component: ProcessPageComponent
      },
      {
        path:'change-password',
        component: ChangePasswordComponent
      },
      {
        path:'stampduty-dashboard',
        component:  StampDutyDashboardComponent
      },
      {
        path:'view-qcdata',
        component:  ViewQCDataComponent
      },
      {
        path: 'prechecking-dashboard',
        component: PreCheckingComponent
      },
      {
        path: 'ulip-prechecking-dashboard',
        component: UlipPrecheckingComponent
      },
      {
        path: 'claim-dashboard',
        component: QueryComponent
      },
      {
        path: 'bulk-approval-dashboard',
        component: BulkApprovalComponent
      },
      {
        path: 'pass-fail-approval',
        component: BulkPassFailComponent
      },
      {
        path: 'duelist-dashboard',
        component: DuelistPassFailComponent
      },
      {
        path: 'duelist-approval',
        component: DuelistApprovalComponent
      },
      {
        path: 'mis-report',
        component: MisReportComponent
      },
      {
		    path: 'product-dashboard',
        component: ProductDashboardComponent, 
      },
      {
		    path: 'new-product',
        component: NewProductComponent, 
      },
      {
        path:'existing-product',
        component:ExistingProductComponent
      },
      {
        path:'product-mis',
        component:ProductMisComponent
      },
      {
        path: 'groups-payout',
        component: GroupsPayoutComponent
      },
      {
        path: 'payout-calculator',
        component: PayoutCalculatorComponent
      },
      {
       path:'bonus-calculator',
       component:BonusCalculatorComponent
      },
      {
        path:'search-filter',
        component: SearchFilterComponent
      },
      {
        path:'search-data',
        component:SearchDataComponent
      },
      {
        path:'RTFlag',
        component:RTFlagComponent
      },
      {
        path:'RTFlagData',
        component:RTFlagDataComponent
      },
     

    ]
  }
  /*{
    path: 'process',
    component: ProcessPageComponent
  },
  */
 /*
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
	  path:'change-password',
	  component: ChangePasswordComponent
  }
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

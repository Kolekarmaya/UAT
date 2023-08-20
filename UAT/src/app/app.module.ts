import { BrowserModule } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from './shared.module';
import { MessageDialog } from './dialog/message/message.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { KatexModule } from 'ng-katex';
import { MatPaginatorModule } from '@angular/material/paginator';
import {HttpRequestInterceptor} from './http-request-interceptor';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ProcessPageComponent } from './process-page/process-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { MatTooltipModule } from '@angular/material/tooltip';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
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
import { ExistingProductComponent } from './existing-product/existing-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductMisComponent } from './product-mis/product-mis.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MisReportComponent } from './mis-report/mis-report.component';
import { GroupsPayoutComponent } from './groups-payout/groups-payout.component';
// import { MAT_DATE_FORMATS } from '@angular/material/core';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatMomentDateModule } from '@angular/material-moment-adapter';


import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { DateFormatDirective } from './date-format.directive';
import { YearMonthFormatDirective } from './year-month-format.directive';
import { PayoutCalculatorComponent } from './payout-calculator/payout-calculator.component';
import { BonusCalculatorComponent } from './bonus-calculator/bonus-calculator.component';
import { SearchDataComponent } from './search-data/search-data.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { RTFlagComponent } from './rt-flag/rt-flag.component';
import { RTFlagDataComponent } from './rt-flag-data/rt-flag-data.component';


// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'MM/YYYY',
//   },
//   display: {
//     dateInput: 'MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

@NgModule({
  declarations: [
    DateFormatDirective,
    YearMonthFormatDirective,
    PayoutCalculatorComponent,
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    MessageDialog,
    DashboardPageComponent,
    ProcessPageComponent,
    ChangePasswordComponent,
    StampDutyDashboardComponent,
    ViewQCDataComponent,
    PreCheckingComponent,
    UlipPrecheckingComponent,
    QueryComponent,
    BulkApprovalComponent,
    BulkPassFailComponent,
    DuelistPassFailComponent,
    DuelistApprovalComponent,
    ProductDashboardComponent,
    ExistingProductComponent,
    NewProductComponent,
    ProductMisComponent,
    MisReportComponent,
    GroupsPayoutComponent,
    BonusCalculatorComponent,
    SearchDataComponent,
    SearchFilterComponent,
    RTFlagComponent,
    RTFlagDataComponent,
    
    
  ],
  imports: [
    MatMomentDateModule,
    MomentDateModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    DragDropModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatMenuModule,
    MatToolbarModule,
    SharedModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MaterialFileInputModule,
    MatGridListModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatSortModule,
    MatProgressBarModule,
    KatexModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    // MomentDateModule,
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    })
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    // },

    // ,{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MessageDialog
  ]
})
export class AppModule {
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  groups_surrender_fail = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Unpaid Premium recovery not done', text: 'Unpaid Premium recovery not done' },
    { value: 'Policy Deposited amount not added', text: 'Policy Deposited amount not added' },
    { value: 'Incorrect Outstanding loan amount calculated by system', text: 'Incorrect Outstanding loan amount calculated by system' },
    { value: 'Incorrect rate of  interest taken by system', text: 'Incorrect rate of  interest taken by system' },
    { value: 'System Paid only 45 & 50 % amount on premium paid', text: 'System Paid only 45 & 50 % amount on premium paid' },
    { value: 'Amount Lying In Outstanding Disbursements', text: 'Amount Lying In Outstanding Disbursements' },
    { value: 'Incorrect  Calculation', text: 'Incorrect  Calculation' },
    { value: 'Others', text: 'Others' }
  ];

  groups_maturity_fail = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Unpaid Premium recovery not done', text: 'Unpaid Premium recovery not done' },
    { value: 'Policy Deposited amount not added', text: 'Policy Deposited amount not added' },
    { value: 'Only Accumulated premium paying', text: 'Only Accumulated premium paying' },
    { value: 'Funds Lying In Outstanding Disbursements', text: 'Funds Lying In Outstanding Disbursements' },
    { value: 'Incorrect  Calculation', text: 'Incorrect  Calculation' },
    { value: 'Maturity amount not payable as per staff Benefit', text: 'Maturity amount not payable as per staff Benefit' },
    { value: 'Others', text: 'Others' }
  ];

  groups_death_claims_fail = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Unpaid Premium recovery not done', text: 'Unpaid Premium recovery not done' },
    { value: 'Policy Deposit amount not added', text: 'Policy Deposit amount not added' },
    { value: 'Incorrect Outstanding loan amount calculated by system', text: 'Incorrect Outstanding loan amount calculated by system' },
    { value: 'Incorrect rate of  interest taken by system', text: 'Incorrect rate of  interest taken by system' },
    { value: 'Incorrect claim decision', text: 'Incorrect claim decision' },
    { value: 'Incorrect Calculation', text: 'Incorrect Calculation' },
    { value: 'Others', text: 'Others' }
  ];

  groups_repudiation_fail = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Incorrect RPU logic', text: 'Incorrect RPU logic' },
    { value: 'Incorrect Outstanding loan amount calculated by system', text: 'Incorrect Outstanding loan amount calculated by system' },
    { value: 'Unpaid Premium recovery not done', text: 'Unpaid Premium recovery not done' },
    { value: 'Incorrect claim decision', text: 'Incorrect claim decision' },
    { value: 'Policy Deposit amount not added', text: 'Policy Deposit amount not added' },
    { value: 'Incorrect Calculation', text: 'Incorrect Calculation' },
    { value: 'Others', text: 'Others' }
  ];

  death_claims = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'OD Amount Incorrect', text: 'OD Amount Incorrect' },
    { value: 'ULIP Charges Recovery', text: 'ULIP Charges Recovery' },
    { value: 'Incorrect Proportionate Annuity', text: 'Incorrect Proportionate Annuity' },
    { value: 'GA Incorrect', text: 'GA Incorrect' },
    { value: 'SB/Maturity/LTR/Annuity recovery from terminal payment', text: 'SB/Maturity/LTR/Annuity recovery from terminal payment' },
    { value: 'Suspension/Restriction Flag on policy', text: 'Suspension/Restriction Flag on policy' },
    { value: 'Bonus Incorrect (VB)', text: 'Bonus Incorrect (VB)' },
    { value: 'Bonus Incorrect (TB)', text: 'Bonus Incorrect (TB)' },
    { value: 'Proposal category - HUF/EE/KeyMan/MWP', text: 'Proposal category - HUF/EE/KeyMan/MWP' },
    { value: 'Units in Both funds (Regular/Disco)', text: 'Units in Both funds (Regular/Disco)' },
    { value: 'Loyalty addition not given under Prod 30/53', text: 'Loyalty addition not given under Prod 30/53' },
    { value: 'PPA till DOI instead of DOM', text: 'PPA till DOI instead of DOM' },
    { value: 'Assignment flag Yes', text: 'Assignment flag Yes' },
    { value: 'Others', text: 'Others' },
    // { value: '', text: '' },
  ];

  surrender = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'GA incorrect', text: 'GA incorrect' },
    { value: 'Proposal category - HUF/EE/KeyMan/MWP', text: 'Proposal category - HUF/EE/KeyMan/MWP' },
    { value: 'GSV/SSV Factor incorrect', text: 'GSV/SSV Factor incorrect' },
    { value: 'Units in Both funds (Regular/Disco)', text: 'Units in Both funds (Regular/Disco)' },
    { value: 'Loan Recovery', text: 'Loan Recovery' },
    { value: 'Units laying in TFA', text: 'Units laying in TFA' },
    { value: 'SB/Maturity/LTR/Annuity recovery from terminal payment', text: 'SB/Maturity/LTR/Annuity recovery from terminal payment' },
    { value: 'Bonus Incorrect (VB)', text: 'Bonus Incorrect (VB)' },
    { value: 'Bonus Incorrect (TB)', text: 'Bonus Incorrect (TB)' },
    { value: 'OD amount incorrect', text: 'OD amount incorrect' },
    { value: 'Suspension/Restriction Flag on policy', text: 'Suspension/Restriction Flag on policy' },
    { value: 'Assignemnt Flag Yes', text: 'Assignemnt Flag Yes' },
    { value: 'Others', text: 'Others' }
  ];
  survival_benifit = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Proposal category - HUF/EE/KeyMan/MWP', text: 'Proposal category - HUF/EE/KeyMan/MWP' },
    { value: 'Bonus Incorrect (VB)', text: 'Bonus Incorrect (VB)' },
    { value: 'Suspension/Restriction Flag on policy', text: 'Suspension/Restriction Flag on policy' },
    { value: 'Status inconsistency', text: 'Status inconsistency' },
    { value: 'Assignemnt Flag Yes', text: 'Assignemnt Flag Yes' },
    { value: 'Others', text: 'Others' }
  ];

  maturity = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Bonus Incorrect (VB)', text: 'Bonus Incorrect (VB)' },
    { value: 'Bonus Incorrect (TB)', text: 'Bonus Incorrect (TB)' },
    { value: 'Proposal category - HUF/EE/KeyMan/MWP', text: 'Proposal category - HUF/EE/KeyMan/MWP' },
    { value: 'OD Amt incorrect', text: 'OD Amt incorrect' },
    { value: 'Units laying in TFA', text: 'Units laying in TFA' },
    { value: 'SB/Maturity/LTR/Annuity reco. from terminal payment', text: 'SB/Maturity/LTR/Annuity reco. from terminal payment' },
    { value: 'Suspension/Restriction Flag on policy', text: 'Suspension/Restriction Flag on policy' },
    { value: 'Loyalty addition not given under Product 30/53', text: 'Loyalty addition not given under Product 30/53' },
    { value: 'Incorrect Maturity Amount - 1B Last Yr. Unpaid Policy', text: 'Incorrect Maturity Amount - 1B Last Yr. Unpaid Policy' },
    { value: 'Units in Both funds (Regular/Disco)', text: 'Units in Both funds (Regular/Disco)' },
    { value: 'Product 17 & 04 - DOM after DOD Bonus Issue', text: 'Product 17 & 04 - DOM after DOD Bonus Issue' },
    { value: 'Assignemnt Flag Yes', text: 'Assignemnt Flag Yes' },
    { value: 'Others', text: 'Others' }
  ];

  ltr = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Suspension/Restriction Flag on policy', text: 'Suspension/Restriction Flag on policy' },
    { value: 'Proposal category - HUF/EE/KeyMan/MWP', text: 'Proposal category - HUF/EE/KeyMan/MWP' },
    { value: 'Less Amount in OD', text: 'Less Amount in OD' },
    { value: 'Units laying in TFA', text: 'Units laying in TFA' },
    { value: 'Units in Both funds (Regular/Disco)', text: 'Units in Both funds (Regular/Disco)' },
    { value: 'GA incorrect', text: 'GA incorrect' },
    { value: 'GSV/SSV Factor incorrect', text: 'GSV/SSV Factor incorrect' },
    { value: 'Loan Recovery', text: 'Loan Recovery' },
    { value: 'SB/Maturity/LTR/Annuity recovery from terminal payment', text: 'SB/Maturity/LTR/Annuity recovery from terminal payment' },
    { value: 'Bonus issue', text: 'Bonus issue' },
    { value: 'Assignemnt Flag Yes', text: 'Assignemnt Flag Yes' },
    { value: 'Others', text: 'Others' }
  ];

  annuity_payout = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Annuity amount calculated on PP incl GST', text: 'Annuity amount calculated on PP incl GST' },
    { value: 'Incorrect Increasing Annuity', text: 'Incorrect Increasing Annuity' },
    { value: 'Proposal category - HUF/EE/KeyMan/MWP', text: 'Proposal category - HUF/EE/KeyMan/MWP' },
    { value: 'Suspension/Restriction Flag on policy', text: 'Suspension/Restriction Flag on policy' },
    { value: 'HPP factor on PP+GST', text: 'HPP factor on PP+GST' },
    { value: 'Others', text: 'Others' }
    // { value: '', text: '' },
  ];

  flc = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'ULIP Charges recovery', text: 'ULIP Charges recovery' },
    { value: 'Medical fee not deducted', text: 'Medical fee not deducted' },
    { value: 'Pro-Rata Mortality not deducted', text: 'Pro-Rata Mortality not deducted' },
    { value: 'Assignemnt Flag Yes', text: 'Assignemnt Flag Yes' },
    { value: 'Others', text: 'Others' }
  ];

  ulip_approved_death_claims = [
    { value: 'Incorrect death benefit calculation', text: 'Incorrect death benefit calculation' },
    { value: 'Incorrect PPA/Fund value', text: 'Incorrect PPA/Fund value' },
    { value: 'Incorrect Horizon/Platinum cover benefit calculation', text: 'Incorrect Horizon/Platinum cover benefit calculation' },
    { value: 'Incorrect recovery of unpaid/mortality premium', text: 'Incorrect recovery of unpaid/mortality premium' },
    { value: 'Clear Case', text: 'Clear Case' }
  ];
  ulip_repudiated_death_claims = [
    { value: 'Incorrect death benefit calculation', text: 'Incorrect death benefit calculation' },
    { value: 'Clear Case', text: 'Clear Case' }
  ];
  non_ulip_approved_death_claims = [
    { value: 'Incorrect death benefit calculation', text: 'Incorrect death benefit calculation' },
    { value: 'Incorrect Bonus/GA  calculation', text: 'Incorrect Bonus/GA calculation' },
    { value: 'Incorrect PPA calculation', text: 'Incorrect PPA calculation' },
    { value: 'Incorrect ISA logic', text: 'Incorrect ISA logic' },
    { value: 'Incorrect SA', text: 'Incorrect SA' },
    { value: 'Incorrect Rider payout', text: 'Incorrect Rider payout' },
    { value: 'Incorrect recovery of Unpaid/terminal premium', text: 'Incorrect recovery of Unpaid/terminal premium' },
    { value: 'Clear Case', text: 'Clear Case' }
  ];
  non_ulip_repudiated_death_claims = [
    { value: 'Incorrect death benefit calculation', text: 'Incorrect death benefit calculation' },
    { value: 'Incorrect Bonus/GA calculation', text: 'Incorrect Bonus/GA calculation' },
    { value: 'Incorrect PPA calculation', text: 'Incorrect PPA calculation' },
    { value: 'Incorrect ISA logic', text: 'Incorrect ISA logic' },
    { value: 'Incorrect PUSA factor applied', text: 'Incorrect PUSA factor applied' },
    { value: 'Incorrect RPU logic', text: 'Incorrect RPU logic' },
    { value: 'Clear Case', text: 'Clear Case' }
  ];
  annuity_death_claims = [
    { value: 'Incorrect death benefit calculation', text: 'Incorrect death benefit calculation' },
    { value: 'Incorrect Rider payout', text: 'Incorrect Rider payout' },
    { value: 'Clear Case', text: 'Clear Case' }
  ];

  indigo_death_claims = [
    { value: 'Out of scope for checking calculation', text: 'Out of scope for checking calculation' }
  ];
  rt_group_death_claims = [
    { value: 'Out of scope for checking calculation', text: 'Out of scope for checking calculation' }
  ];
  //pravin changes comment
  qcRemarksValues = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Unpaid Premium recovery not done', text: 'Unpaid Premium recovery not done' },
    { value: 'Policy Deposited amount not added', text: 'Policy Deposited amount not added' },
    { value: 'Only Accumulated premium paying', text: 'Only Accumulated premium paying' },
    { value: 'Funds Lying In Outstanding Disbursements', text: 'Funds Lying In Outstanding Disbursements' },
    { value: 'Incorrect  Calculation', text: 'Incorrect  Calculation' },
    { value: 'Maturity amount not payable as per staff Benefit', text: 'Maturity amount not payable as per staff Benefit' },
    { value: 'Others', text: 'Others' }
  ];

  ulip_non_ulip_maturity = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Incorrect calculation', text: 'Incorrect calculation' },

  ]
  ulip_non_ulip_maturity_lock = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Incorrect calculation', text: 'Incorrect calculation' },
    { value: 'Out Of Scope Lock-In Future SV Case', text: 'Out Of Scope Lock-In Future SV Case' }

  ]
  currentDate = new Date();
  constructor(private httpClient: HttpClient,
    //private datePipe: DatePipe
  ) {
    //this.currentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');              
  }



  public updatePolicyData(policyData, moduleId, processId, requested_by, subModuleId) {
    console.log('updatePolicyData :: policyData =>', policyData, moduleId, processId, requested_by, subModuleId);

    console.log('currentDate >>', new Date());
    console.log(formatDate(new Date(), 'dd/MM/yyyy', 'en'));
    var date = new Date();
    var hours: any = date.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    }
    var minutes: any = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    var seconds: any = date.getMilliseconds();
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    else if (seconds > 99) {
      seconds = seconds.toString().slice(0, 2);
    }
    // console.log('time>>')

    var timeStamp = hours + ':' + minutes + ':' + seconds;
    var dateStamp = formatDate(date, 'dd/MM/yyyy', 'en')
    console.log('timeStamp ::::', timeStamp);
    console.log('dateStamp ::::', dateStamp);

    let policyDetail = {
      'module_id': moduleId,
      'request_action': processId,
      'requested_by': requested_by,
      'subModuleId': subModuleId,
      'policy_no': policyData['POLICY_NO'],
      'wfthread': policyData['WFTHREAD'],
      'uni_id': policyData['UNI_ID'],
      'pq_qc_flag': policyData['PQ_QC_FLAG'],
      'pq_qc_remarks': policyData['PQ_QC_REMARKS'],
      'QC_Calculated_Value': policyData['QC_Calculated_Value'] ? policyData['QC_Calculated_Value'] : 0.0,
      'qc_date': dateStamp,
      'qc_time': timeStamp
    };

    console.log('policyDetail ::', policyDetail);

    //let url = "../../assets/newData.json";
    //let url = 'http://localhost:6543/core/processOutputFlag';
    //  let url="../../assets/bulk.json"

    let url = '/core/processOutputFlag';
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      headers: httpHeaders,
      params: policyDetail
    };

    // console.log('policyDetail == ', policyDetail);
    return this.httpClient.post<any>(url, policyDetail, options);
    //  return this.httpClient.get<any>(url);

  }

  public fetchAfterQCPolicyData(moduleId, processId, subModuleId, startDate, endDate) {
    let detail = {
      'module_id': moduleId,
      'request_action': processId,
      'subModuleId': subModuleId,
      'startDate': startDate,
      'endDate': endDate
    };
    console.log('detail ::', detail);

    let url = '/core/fetchAfterQCData';//todo
    //  let url = "../../assets/newData_afterQC.json";
    //  let url="../../assets/bulk.json"
    //  let url="../../assets/databulk.json"


    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      headers: httpHeaders,
      params: detail
    };

    return this.httpClient.post<any>(url, detail, options);
    // return this.httpClient.get<any>(url);
  }

  public updateBulkPolicyData(policyData, moduleId, processId, requested_by, subModuleId) {
    console.log('updatePolicyData :: policyData =>', policyData);
    var date = new Date();
    var hours: any = date.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    }
    var minutes: any = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    var seconds: any = date.getMilliseconds();
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    else if (seconds > 99) {
      seconds = seconds.toString().slice(0, 2);
    }
    // console.log('time>>')

    var timeStamp = hours + ':' + minutes + ':' + seconds;
    var dateStamp = formatDate(date, 'dd/MM/yyyy', 'en')
    let policyArray = []
    for (let index = 0; index < policyData.length; index++) {
      let policyDetail = {
        'module_id': moduleId,
        'request_action': processId,
        'requested_by': requested_by,
        'subModuleId': subModuleId,
        'policy_no': policyData[index]['POLICY_NO'],
        'wfthread': policyData[index]['WFTHREAD'],
        'uni_id': policyData[index]['UNI_ID'],
        'pq_qc_flag': policyData[index]['PQ_QC_FLAG'],
        'pq_qc_remarks': policyData[index]['PQ_QC_REMARKS'],
        'QC_Calculated_Value': policyData[index]['QC_Calculated_Value'] ? policyData[index]['QC_Calculated_Value'] : 0.0,
        'qc_date': dateStamp,
        'qc_time': timeStamp
      };
      policyArray.push(policyDetail)

    }
    console.log(policyArray);

    // let url = "../../assets/newData.json";
    // let url = 'http://localhost:6543/core/processOutputFlag';
    //  let url="../../assets/bulk.json"
    let url = '/core/processOutputFlag'; //TODO
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      headers: httpHeaders,
      params: policyArray[0]
    };
    //rohit changes 14-10-22


    return this.httpClient.post<any>(url, policyArray, options);
    // return this.httpClient.get<any>(url);//TODO

  }

}

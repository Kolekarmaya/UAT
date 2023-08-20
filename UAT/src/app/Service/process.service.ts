import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor( private httpClient : HttpClient ) { }

  ngOnInIt() {
  }

  processMap = {  'PROCESS_INPUT' : 'processInput' ,  
                  'PROCESS_LOGIC' : 'processLogic', 
                  'PROCESS_OUTPUT' : 'processOutput' ,
                  'PROCESS_CALCULATION' : 'processCalculation',
                  
                };
                

 
    
  public sendProcessDetails( processDetails, process ) {
    console.log('sendProcessDetails :: ', processDetails, process );
    console.log(this.processMap[process]);
    
    let url = '/core/' + this.processMap[process] ; //TODO remove comments
    // let url="../../assets/bulk.json"
        // let url="../../assets/databulk.json"

    // let url = "../../assets/newData_afterQC.json";
    // let url = "../../assets/payoutCalculate.json";
    console.log('url ===', url);

    //Make a call to API and get response which will be displayed inside the dashboard table

    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      params: processDetails
    }; 

   return this.httpClient.post<any>(url , processDetails, options ); //TODO remove comments
    //  return this.httpClient.get<any>(url);
  }

  public sendProcess( processDetails, process ) {
    console.log('sendProcessDetails :: ', processDetails, process );
    console.log(this.processMap[process]);
    
    let url = '/core/filterPolicyData'  ; //TODO remove comments
    // let url="../../assets/bulk.json"
    // let url = "../../assets/payoutCalculate.json";
    console.log('url ===', url);

    //Make a call to API and get response which will be displayed inside the dashboard table

    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      params: processDetails
    }; 

    return this.httpClient.post<any>(url , processDetails, options ); //TODO remove comments
    // return this.httpClient.get<any>(url);
  }

  public getMISDashboardDetails (){
    console.log('inside getMISDashboardDetails')
    let url = '/core/misDashboard'
    console.log(url)
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders
    }; 

    // return this.httpClient.get<any>(url);
    return this.httpClient.post<any>(url , {}, options ); //TODO remove comments
  }
  
  private httpErrorMessage: string;
  
  errorHandler(error: HttpErrorResponse): boolean {
    if (error.status === 400) {
      this.httpErrorMessage = 'Server Error';
    } else if (error.status === 403) {
      this.httpErrorMessage = 'Forbidden!!';
    } else {
      this.httpErrorMessage = 'Server Error!!';
    }
    return false;
  }
  //daterang search filter
public submitDateRange( processDetails, process ) {
  console.log('sendProcessDetails :: ', processDetails, process );
  console.log(this.processMap[process]);
  
  let url = '/core/filterPolicyData';//todo
  // let url="../../assets/bulk.json"
  // let url = "../../assets/payoutCalculate.json";
  console.log('url ===', url);

  //Make a call to API and get response which will be displayed inside the dashboard table

  let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
  let options = {
    headers: httpHeaders,
    params: processDetails
  }; 

  return this.httpClient.post<any>(url , processDetails, options ); //TODO remove comments
  // return this.httpClient.get<any>(url);
}

 //daterang search filter
 public SubmitRTFlag( processDetails, process ) {
  console.log('sendProcessDetails :: ', processDetails, process );
  console.log(this.processMap[process]);
  
  let url = '/core/RTFlagUpdate';//todo
  // let url="../../assets/bulk.json"
  // let url = "../../assets/payoutCalculate.json";
  console.log('url ===', url);

  //Make a call to API and get response which will be displayed inside the dashboard table

  let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
  let options = {
    headers: httpHeaders,
    params: processDetails
  }; 

  return this.httpClient.post<any>(url , processDetails, options ); //TODO remove comments
  // return this.httpClient.get<any>(url);
}

}

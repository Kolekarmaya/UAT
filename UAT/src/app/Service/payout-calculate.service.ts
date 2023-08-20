import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayoutCalculateService {

  constructor(private httpClient : HttpClient ) { }


  public getCalculatedPayout (data){
    console.log('inside getCalculatedPayout')
    let url = '/core/calculatePayout'
    // let url = "../../assets/payoutCalculate.json";
    // let url = "../../assets/mis_data copy.json";
    console.log(url)
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      params: data
    }; 

    // return this.httpClient.get<any>(url);
    return this.httpClient.post<any>(url , {}, options ); //TODO remove comments
  }

  public getCalculateBonus (data){
    console.log('inside getCalculatedBouns')
    let url = '/core/calculateBonus'
    // let url = "../../assets/payoutCalculate.json";
    // let url = "../../assets/mis_data copy.json";
    console.log(url)
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      params: data,

    }; 

    // return this.httpClient.get<any>(url);
    return this.httpClient.post<any>(url , {}, options ); //TODO remove comments
  }

public getCalBonus (data){
  console.log('inside getCaledBouns')
  let url = '/core/CalBonus'
  // let url = "../../assets/payoutCalculate.json";
  // let url = "../../assets/mis_data copy.json";
  console.log(url)
  let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
  let options = {
    headers: httpHeaders,
    params: data,

  }; 
  // return this.httpClient.get<any>(url);
  return this.httpClient.post<any>(url , {}, options ); //TODO remove comments
}

public getData( data, url ) {
    // url = "../../assets/payoutCalculate.json";
    console.log(url);
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      params: data
    }; 

    // return this.httpClient.get<any>(url);
    return this.httpClient.post<any>(url , {}, options ); //TODO remove comments

  }

 
}


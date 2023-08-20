import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) { }
  
  updatePassword(username: string, password: string) {
    console.log('updatePassword :: username :', username ,password);
	
    return this.http.post('/core/updatePassword', {login: username, password: password});
  }
   
}

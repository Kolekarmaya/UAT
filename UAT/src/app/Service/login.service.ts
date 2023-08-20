import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {
  }

  public get currentUserValue(): User {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }

  login(username: string, password: string) {
    return this.http.post('API', { username, password })
      .pipe(map(user => {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }));
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }
}

import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  username = new BehaviorSubject<string>(undefined);
  currentUsername = this.username.asObservable();

constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(this.baseURL + 'login', model).pipe(
   map((response: any) => {
    const user = response;
    if (user) {
      localStorage.setItem('token', user.token);
      this.decodedToken = this.jwtHelper.decodeToken(user.token);
      this.changeUsername(this.decodedToken.unique_name);
    }
  })
  );
  }

 register(model: any) {
  return this.http.post(this.baseURL + 'register', model);
 }

 loggedIn() {
 const token = localStorage.getItem('token');
 return !this.jwtHelper.isTokenExpired(token);
 }

 changeUsername(username: string) {
  this.username.next(username);
 }

}





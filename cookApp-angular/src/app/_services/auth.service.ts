import { AlertifyService } from './alertify.service';
import { UserService } from './user.service';
import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  username = new BehaviorSubject<string>(undefined);
  currentUsername = this.username.asObservable();

  userPhotoUrl = new BehaviorSubject<string>(undefined);
  currentPhotoUrl = this.userPhotoUrl.asObservable();

constructor(private http: HttpClient, private userService: UserService, private alertify: AlertifyService) {}

login(model: any) {
  return this.http.post(this.baseURL + 'login', model).pipe(
   map((response: any) => {
    const user = response;
    if (user) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user.user));
      this.currentUser = user.user;
      this.decodedToken = this.jwtHelper.decodeToken(user.token);
      this.changeUsername(this.decodedToken.unique_name);
      this.changeUserPhotoUrl(this.currentUser.photoUrl);
    }
  })
  );
  }

 register(user: User) {
  return this.http.post(this.baseURL + 'register', user);
 }

 loggedIn() {
 const token = localStorage.getItem('token');
 return !this.jwtHelper.isTokenExpired(token);
 }

 changeUsername(username: string) {
  this.username.next(username);
 }
 changeUserPhotoUrl(photoUrl: string) {
   this.userPhotoUrl.next(photoUrl);
 }

}





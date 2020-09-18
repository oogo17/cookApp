import { Photo } from './../_models/Photo';
import { UserService } from './../_services/user.service';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  username: string;
  userPhotoUrl: string;
  currentUserId: number;
  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router, private userService: UserService) { }

  ngOnInit() {

    this.currentUserId = this.authService.decodedToken.nameid;
    this.authService.currentUsername.subscribe(username => this.username = username);
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.userPhotoUrl = photoUrl);
  }

  Login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Login Successful');
      this.router.navigate(['/home', this.authService.decodedToken.nameid]);
    }, error => {
      this.alertify.error(error);
    });

  }

  LoggedIn() {
    return this.authService.loggedIn();
  }

  LoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.authService.decodedToken = null;
  this.authService.currentUser = null;
  this.alertify.success('loggedOut');
  this.model.username = '';
  this.model.password = '';
  this.router.navigate(['/']);
  }

  EditUser() {
  }

}

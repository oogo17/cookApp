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
  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.authService.currentUsername.subscribe(username => this.username = username);
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
  this.authService.decodedToken = '';
  this.alertify.success('loggedOut');
  this.model.username = '';
  this.model.password = '';
  this.router.navigate(['/']);
  }

  EditUser() {
  }

}

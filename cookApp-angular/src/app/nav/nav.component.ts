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
  constructor(public authService: AuthService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  Login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('login success');
      this.router.navigate(['/home']);
    }, error => {
      this.alertify.error(error);
    });

  }

  LoggedIn() {
    return this.authService.loggedIn();
  }

  LoggedOut() {
  console.log( this.authService.decodedToken);
  localStorage.removeItem('token');
  this.alertify.success('loggedOut');
  this.model.username = '';
  this.model.password = '';
  this.router.navigate(['/']);
  }

  EditUser() {
   console.log( this.authService.decodedToken);
  }

}

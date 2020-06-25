import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  username = '';
  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  Login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('login success');
      this.username = this.authService.decodedToken.unique_name;
    }, error => {
      this.alertify.error(error);
    });

  }

  LoggedIn() {
    return this.authService.loggedIn();
  }

  LoggedOut() {
  localStorage.removeItem('token');
  console.log('loggedOut');
  }

}

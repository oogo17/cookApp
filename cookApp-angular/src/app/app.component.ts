import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token) {
        this.authService.decodedToken = this.jwtHelper.decodeToken(token);
        if (this.authService.loggedIn) {
          this.authService.changeUsername(this.authService.decodedToken.unique_name);
          // this.router.navigate(['/home', this.authService.decodedToken.nameid]);
        }
    }
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeUserPhotoUrl(user.photoUrl);
    }

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }
}

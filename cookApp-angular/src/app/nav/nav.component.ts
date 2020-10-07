import { Notification } from './../_models/Notification';
import { NotificationService } from './../_services/notification.service';
import { Photo } from './../_models/Photo';
import { UserService } from './../_services/user.service';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  username: string;
  userPhotoUrl: string;
  currentUserId: number;
  notifications: Notification[];
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.decodedToken.nameid;
    this.authService.currentUsername.subscribe(
      (username) => (this.username = username)
    );
    this.authService.currentPhotoUrl.subscribe(
      (photoUrl) => (this.userPhotoUrl = photoUrl)
    );
    this.notificationService.getNotifications(this.currentUserId).subscribe (notifications => {
      this.notifications = notifications;
      console.log(this.notifications);
    }, error => {
      this.alertify.error(error);
    });
  }

  Login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Login Successful');
        this.router.navigate(['/home', this.authService.decodedToken.nameid]);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
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

  EditUser() {}

  NotificationDetail(notification: Notification) {

    this.router.navigate(['/fallowUser/recipe/', notification.userId, notification.recipeId]);
  }
}

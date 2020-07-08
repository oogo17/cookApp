import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-fallow-user-list',
  templateUrl: './fallow-user-list.component.html',
  styleUrls: ['./fallow-user-list.component.css'],
})
export class FallowUserListComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe( (users: User[]) => {
      this.users = users;
      console.log(users);
    }, error => {
      this.alertify.error(error);
    });
  }
}

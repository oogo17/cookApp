import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/User';
import { FollowUsers } from '../_models/FollowUsers';

@Component({
  selector: 'app-fallow-user-list',
  templateUrl: './fallow-user-list.component.html',
  styleUrls: ['./fallow-user-list.component.css'],
})
export class FallowUserListComponent implements OnInit {
  followUsers: FollowUsers[];
  user: User;
  userId: number;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      // tslint:disable-next-line:no-string-literal
      this.user = data['user'];
    });
    this.followUsers = this.user.followUsers;
  }

  loadUsers() {
    this.userService.getUser(this.userId).subscribe( (user: User) => {
      this.followUsers = user.followUsers;
    }, error => {
      this.alertify.error(error);
    });
  }

  getRecipes(user: User) {

  }
}

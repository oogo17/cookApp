import { FollowUsersDetails } from './../../_models/FollowUsersDetails';
import { FallowUserService } from './../../_services/fallowUser.service';
import { Notification } from './../../_models/Notification';
import { NotificationService } from './../../_services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { User } from '../../_models/User';
import { FollowUsers } from '../../_models/FollowUsers';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-fallow-user-list',
  templateUrl: './fallow-user-list.component.html',
  styleUrls: ['./fallow-user-list.component.css'],
})
export class FallowUserListComponent implements OnInit {
  followUsers: FollowUsers[];
  user: User;
  userId: number;
  inputUser: string;
  control = new FormControl();
  userList: User[];
  filteredUsers: Observable<User[]>;
  selectedUser: number;
  notification: Notification[];
  notificationCount: number;
  followUsersDetail: FollowUsersDetails[];

  constructor(
    private userService: UserService,
    private followService: FallowUserService,
    private auth: AuthService,
    private alertify: AlertifyService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.followUsers  = data.user;
      console.log(this.followUsers);
      this.getNotifications(this.auth.decodedToken.nameid);

    });

    this.userService.getUsers().subscribe(user => {
      this.userList = user;
      this.userList = this.userList.filter(res => {
       return res.id !== this.auth.decodedToken.nameid;
      });
         // this.selectedUser = this.userList[1].id;
    });

    this.filteredUsers = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

  }


  private _filter(value: string): User[] {
    const filterValue = this._normalizeValue(value);
    if (this.userList) {
      return this.userList.filter((res) =>
      this._normalizeValue(res.userName).includes(filterValue)
    );
    }

  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  fallowUser(user: User) {
    this.route.navigate(['/fallowUser/', user.id]);
  }

  userDetail(fallowUser: FollowUsers) {
  console.log(fallowUser);
  const user = this.userList.find(x => x.userName === fallowUser.username);
  console.log(user);
  this.route.navigate(['/fallowUser/', user.id]);
  }

  getNotifications(id: number) {
    this.notificationService.getNotifications(id).subscribe( data => {
      this.notification = data;
      // this.notification = this.notification.filter(next => {
      //   return this.followUsers.find(x => x.followerId === next.userId);
      // });
      console.log(this.notification);
      this.notificationCount = this.notification.length;

      this.getFollowUsersDetails();
    }, error => {
      this.alertify.error(error);
    });
  }

  notificationDe(c) {
    console.log(c);
  }

  getFollowUsersDetails() {

    const createFollowUserWithNotification = [];
    // const t = this.followUsersDetail.concat(this.followUsers, this.notification);
    this.followUsers.forEach(x => {

     const item = {
        urlPhoto: x.urlPhoto,
        followerId: x.followerId,
        username: x.username,
        notifications: []
      };

     this.notification.forEach( y => {
        if (x.followerId === y.userId) {
          const not: Notification = {
            notificationTypeId: y.notificationTypeId,
            description: y.description,
            entity: y.entity,
            userId: y.userId,
            notifyUserId: y.notifyUserId,
            created: y.created,
            recipeId: y.recipeId,
            seen: y.seen
          };
          item.notifications.push(not);
        }
      });
     createFollowUserWithNotification.push(item);
       // console.log(item);
    });
    this.followUsersDetail = createFollowUserWithNotification;
    console.log(this.followUsersDetail);
    // this.followUsers;


  }




}

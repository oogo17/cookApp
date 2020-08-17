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

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private alertify: AlertifyService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.user = data.user;
    });
    this.followUsers = this.user.followUsers;

    this.userService.getUsers().subscribe(user => {
      this.userList = user;
      this.userList = this.userList.filter(res => {
       return res.id !== this.user.id;
      });
         // this.selectedUser = this.userList[1].id;
    });

    this.filteredUsers = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  loadUsers() {
    this.userService.getUser(this.userId).subscribe( (user: User) => {
      this.followUsers = user.followUsers;
    }, error => {
      this.alertify.error(error);
    });
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
  const user = this.userList.find(x => x.userName === fallowUser.username);
  this.route.navigate(['/fallowUser/', user.id]);
  }
}

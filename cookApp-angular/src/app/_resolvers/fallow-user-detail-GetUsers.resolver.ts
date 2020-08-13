
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/User';

@Injectable()
export class FallowUserDetailGetUsersResolver implements Resolve<User> {

  constructor(
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  resolve(): Observable<User> {
    return this.userService.getUsers().pipe(
      catchError(error => {
        this.alertify.error(error);
        return of(null);
      })
    );
  }
}

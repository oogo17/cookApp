import { AuthService } from './../_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from './../_services/alertify.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class FollowUsersResolver implements Resolve<User> {
idUser = this.auth.decodedToken.nameid;

/**
 *
 */
constructor(private alertify: AlertifyService, private userService: UserService, private auth: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    // tslint:disable-next-line:no-string-literal
    return this.userService.getUser(route.params['id']).pipe(
      catchError(error => {
        this.alertify.error(error);
        return of(null);
      })
    );
  }


}

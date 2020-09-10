import { FallowUserService } from './../_services/fallowUser.service';
import { AuthService } from './../_services/auth.service';
import { AlertifyService } from './../_services/alertify.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FollowUsers } from '../_models/FollowUsers';

@Injectable()
export class FollowUsersResolver implements Resolve<FollowUsers[]> {
idUser = this.auth.decodedToken.nameid;

/**
 *
 */
constructor(private alertify: AlertifyService, private FollowUserService: FallowUserService, private auth: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<FollowUsers[]> {
    // tslint:disable-next-line:no-string-literal
    return this.FollowUserService.getFollowUsers().pipe(
      catchError(error => {
        this.alertify.error(error);
        return of(null);
      })
    );
  }


}

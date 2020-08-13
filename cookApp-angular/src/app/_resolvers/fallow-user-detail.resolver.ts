import { FallowUserService } from './../_services/fallowUser.service';
import { FollowUsers } from './../_models/FollowUsers';
import { Resolve } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class FallowUserDetailResolver implements Resolve<FollowUsers> {
  constructor(
    private alertify: AlertifyService,
    private fallowUserService: FallowUserService
  ) {}

  resolve(): Observable<FollowUsers> {
    return this.fallowUserService
      .getFollowUsers()
      .pipe(
        catchError((error) => {
          this.alertify.error(error);
          return of(null);
        })
      );
  }
}

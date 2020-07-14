import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Recipe } from '../_models/Recipe';
import { User } from '../_models/User';

@Injectable()
export class UserEditResolver implements Resolve<User> {

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

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

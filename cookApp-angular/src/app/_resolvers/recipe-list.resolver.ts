import { AuthService } from './../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Recipe } from '../_models/Recipe';
import { User } from '../_models/User';

@Injectable()
export class RecipeListResolver implements Resolve<User> {
idUser = this.auth.decodedToken.nameid;
user: User;
recipes: Recipe[];
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private auth: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    // tslint:disable-next-line:no-string-literal
    return this.userService.getUser(this.idUser).pipe(
      catchError(error => {
        this.alertify.error(error);
        return of(null);
      })
    );
  }
}

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
export class RecipeListResolver implements Resolve<Recipe> {
idUser = this.auth.decodedToken.nameid;
pageNumber = 1;
pageSize = 6;
user: User;
recipes: Recipe[];
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private auth: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Recipe> {
    // tslint:disable-next-line:no-string-literal
    return this.userService.getRecipes(route.params['id'], this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error(error);
        return of(null);
      })
    );
  }
}

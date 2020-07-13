import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Recipe } from '../_models/Recipe';

@Injectable()
export class RecipeDetailResolver implements Resolve<Recipe> {

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Recipe> {
    // tslint:disable-next-line:no-string-literal
    return this.userService.getRecipe(route.params['id']).pipe(
      catchError(error => {
        this.alertify.error(error);
        return of(null);
      })
    );
  }
}

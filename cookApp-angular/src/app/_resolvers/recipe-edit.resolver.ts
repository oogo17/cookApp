import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Recipe } from '../_models/Recipe';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RecipeEditResolver implements Resolve<Recipe> {
  /**
   *
   */
  constructor(private userService: UserService, private alertify: AlertifyService) {}

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

import { UserEditComponent } from './../user/user-edit/user-edit.component';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanDeactivate } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class PreventUnsaveChanges implements CanDeactivate<UserEditComponent> {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  canDeactivate(component: UserEditComponent) {
    if (component.editform.dirty) {
      return confirm('Are you sure you want to continue? any unsave changes will be lost.');
    }
    return true;
  }
}

import { Router } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: boolean;
  @Output() cancelRegistration = new EventEmitter();
  @Output() registrationApproved = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  Register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Successfuly register');
      this.authService.login(this.model).subscribe(next => {
        this.router.navigate(['/home']);
      }, error => {
        this.alertify.error(error);
      });
      this.model.username = '';
      this.model.password = '';
      this.registrationApproved.emit(true);
    }, error => {
      this.alertify.error(error);
    });
  }

  Cancel() {
    this.cancelRegistration.emit(false);
  }

}

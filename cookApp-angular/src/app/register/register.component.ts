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

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  Register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('Successfuly register');
      this.model.username = '';
      this.model.password = '';
    }, error => {
      this.alertify.error(error);
    });
  }

  Cancel() {
    this.cancelRegistration.emit(false);
  }

}

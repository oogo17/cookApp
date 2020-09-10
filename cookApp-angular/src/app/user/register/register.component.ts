import { User } from './../../_models/User';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: boolean;
  @Output() cancelRegistration = new EventEmitter();
  @Output() registrationApproved = new EventEmitter();
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  user: User;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {

    this.bsConfig = {
      containerClass: 'theme-dark-blue',
      maxDate: new Date()
    };
    this.createRegisterForm();
    // this.registerForm = new FormGroup(
    //   {
    //     username: new FormControl("", Validators.required),
    //     password: new FormControl("", [
    //       Validators.required,
    //       Validators.minLength(4),
    //       Validators.maxLength(8),
    //     ]),
    //     confirmPassword: new FormControl("", Validators.required),
    //   },
    //   this.PasswordMatchValidator
    // );
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // dateOfBirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.PasswordMatchValidator});
  }

  PasswordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  Register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe( res => {
        this.alertify.success('Enjoy cooking');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe( res => {
          this.router.navigate(['/home/', this.authService.decodedToken.nameid]);
        }, error => {
          this.alertify.error(error);
        });
      });
    }
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('Successfuly register');
    //   this.authService.login(this.model).subscribe(next => {
    //     this.router.navigate(['/home', this.authService.decodedToken.nameid]);
    //   }, error => {
    //     this.alertify.error(error);
    //   });
    //   this.model.username = '';
    //   this.model.password = '';
    //   this.registrationApproved.emit(true);
    // }, error => {
    //   this.alertify.error(error);
    // });
  }

  Cancel() {
    this.cancelRegistration.emit(false);
  }
}

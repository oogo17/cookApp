import { Password } from './../../_models/Password';
import { ZipCodeInfo } from './../../_models/ZipCodeInfo';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Country } from './../../_models/Country';
import { environment } from './../../../environments/environment';
import { AuthService } from './../../_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { NgForm, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { CountriesAPIService } from 'src/app/_services/countriesAPI.service';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;
  changePassword = true;
  passwordValue = 'asdfghj';
  // control = new FormControl();
  country: Country[];
  passwords: Password = {
    currentPassword: '',
    newPassword: ''
  };
  countriesList: string[];
  filteredCountries: Observable<string[]>;
  updateUserForm: FormGroup;
  updatePasswordForm: FormGroup;
  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  isModalShown = false;

  // @ViewChild('editForm', { static: true }) editform: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.updateUserForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService,
    private auth: AuthService,
    private countries: CountriesAPIService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
      console.log(data);
      this.createUpdateUserForm(this.user);
      this.setCountryValues();
    });
    this.initializeUploader();

    this.countries.getCountries().subscribe(
      (res) => {
        this.country = res as Country[];
        this.countriesList = this.country.map((x) => x.name);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  setCountryValues() {
    this.updateUserForm.controls.country.setValue(this.user.country);
    this.filteredCountries = this.updateUserForm.controls.country.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value)));
  }

  createUpdateUserForm(user: User) {
   //  password: [{value: this.passwordValue, disabled: this.changePassword},
    this.updateUserForm = this.formBuilder.group({
      username: [user.userName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      password: [{value: this.passwordValue, disabled: true},
         [Validators.required,  Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: [''],
      zipCode: [user.zipCode],
      city: [user.city],
      state: [user.state],
      country: [user.country]
    });
    // , {validator: this.PasswordMatchValidator}
    this.updatePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required,  Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.PasswordMatchValidator});
  }
  PasswordMatchValidator(g: FormGroup) {
    return g.get('newPassword').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    if (filterValue.length > 1) {
      return this.countriesList.filter((name) =>
        this._normalizeValue(name).includes(filterValue)
      );
    }
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  updateUser() {
    console.log(this.updateUserForm);
    this.userService
      .updateUser(this.auth.decodedToken.nameid, this.updateUserForm.value)
      .subscribe(
        (next) => {
          this.alertify.success('Update Success');
          this.updateUserForm.reset(this.updateUserForm.value);
          this.auth.changeUsername(this.updateUserForm.controls.username.value);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.auth.decodedToken.nameid + '/photo',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;

      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }

    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res = JSON.parse(response);

        this.user.photoUrl = res.photoUrl;
        this.auth.changeUserPhotoUrl(this.user.photoUrl);
        this.alertify.success('Update Success');
      }
    };


  }
  changePswrd() {
    this.isModalShown = this.changePassword;
  }

  getZipCodeInfo(e: any) {
    this.countries.getInfoFromZipCode(+e.target.value).subscribe ( data => {
        const info = data as ZipCodeInfo;
        console.log(info);
        this.updateUserForm.controls.city.setValue(info.city);
        this.updateUserForm.controls.state.setValue(info.state);
    }, error => {
      this.alertify.error(error);
    });
  }

   showModal(): void {
     this.isModalShown = true;
  }

  hideModal(): void {
    this.autoShownModal.hide();
    this.updatePasswordForm.reset();
    this.updatePasswordForm.updateValueAndValidity();
  }

  onHidden(): void {
    this.isModalShown = false;
  }

  updatePassword() {
   console.log(this.updatePasswordForm.value);
   this.passwords.currentPassword = this.updatePasswordForm.controls.currentPassword.value;
   this.passwords.newPassword = this.updatePasswordForm.get('newPassword').value;
   this.userService.updatePassword(this.user.id, this.passwords).subscribe(res => {
      this.alertify.success('Password Updated');
      this.autoShownModal.hide();
      this.updatePasswordForm.reset();
      this.updatePasswordForm.updateValueAndValidity();
   }, error => {
     console.log(error);
     this.alertify.error(error);
     if (error === 'invalid password') {
      this.updatePasswordForm.controls.currentPassword.setValue('');
     }
   });

  }
  forgetPassword() {
    console.log(this.auth.currentUser);
  }
}

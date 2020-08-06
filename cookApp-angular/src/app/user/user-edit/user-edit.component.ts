import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Country } from './../../_models/Country';
import { environment } from './../../../environments/environment';
import { AuthService } from './../../_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { NgForm, FormControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { CountriesAPIService } from 'src/app/_services/countriesAPI.service';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { startWith, map } from 'rxjs/operators';

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
  changePassword = false;
  passwordValue = 'asdfghj';
  control = new FormControl();
  country: Country[];
  countriesList: string[];
  filteredCountries: Observable<string[]>;

  @ViewChild('editform', { static: true }) editform: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editform.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService,
    private auth: AuthService,
    private countries: CountriesAPIService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
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
    this.control.setValue(this.user.country);
    this.filteredCountries = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
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
    this.userService
      .updateUser(this.auth.decodedToken.nameid, this.user)
      .subscribe(
        (next) => {
          this.alertify.success('Update Success');
          this.editform.reset(this.user);
          this.auth.changeUsername(this.user.userName);
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
      }
    };
  }
  changePswrd() {
    this.changePassword = !this.changePassword;
    this.changePassword
      ? (this.passwordValue = '')
      : (this.passwordValue = 'asdfghj');
  }
}

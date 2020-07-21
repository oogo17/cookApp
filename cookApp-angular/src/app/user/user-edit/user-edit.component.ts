import { environment } from './../../../environments/environment';
import { AuthService } from './../../_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/Photo';


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

  @ViewChild('editform', {static: true}) editform: NgForm;
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
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      // tslint:disable-next-line:no-string-literal
      this.user = data['user'];
    });
    console.log(this.user);
    this.initializeUploader();
  }

  updateUser() {
    console.log(this.user);
    this.userService.updateUser(this.auth.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('update succes');
      this.editform.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
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
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {

      if (response) {
        const res = JSON.parse(response);

        this.user.photoUrl = res.photoUrl;
      }



    };
  }
  changePswrd() {
    this.changePassword = !this.changePassword;
    this.changePassword ? this.passwordValue = '' : this.passwordValue = 'asdfghj';
  }
}

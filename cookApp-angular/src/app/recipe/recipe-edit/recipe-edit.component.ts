import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/_models/Recipe';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  recipe: Recipe;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadUser();
    this.initializeUploader();
  }

  loadUser() {
    // tslint:disable-next-line:no-string-literal
    this.userService.getRecipe(+this.route.snapshot.params['id']).subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
        // console.log(recipe);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  onSubmit() {

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

        this.recipe.photoUrl = res.photoUrl;
      }



    };
  }
}

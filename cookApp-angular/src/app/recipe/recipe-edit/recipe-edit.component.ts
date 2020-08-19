import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
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
  userId: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      // tslint:disable-next-line:no-string-literal
      this.recipe = data['recipe'];
    });
    this.userId = this.auth.decodedToken.nameid;
    this.initializeUploader();
  }


  loadRecipe() {
    // tslint:disable-next-line:no-string-literal
    this.userService.getRecipe(+this.route.snapshot.params['id']).subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  updateRecipe() {
    this.userService.updateRecipe(this.recipe.id, this.recipe).subscribe(next => {
      this.alertify.success('update succes');
      // this.editform.reset(this.recipe);
    }, error => {
      this.alertify.error(error);
    });

  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'recipephoto/' + this.recipe.id + '/photo',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
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

        this.recipe.photoUrl = res.photoUrl;
        this.alertify.success('photo updated!!');
      }



    };
  }
}

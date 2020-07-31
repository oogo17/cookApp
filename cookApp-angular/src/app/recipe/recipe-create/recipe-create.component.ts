import { Ingredients } from './../../_models/Ingredients';
import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/_models/Recipe';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
 // items = [0];
   recipe: any = {
     ingredients: [{}],
     steps: [{}]
   };
   userId: any;


  ingredientsLength = this.recipe.ingredients.length;
  stepsLength = this.recipe.steps.length;

  constructor(private auth: AuthService, private userService: UserService, private alertify: AlertifyService) {

  }

  ngOnInit() {
    this.recipe.allowShare = true;
    this.userId = this.auth.decodedToken.nameid;

  }

  createRecipe() {

    this.userService.createRecipe(this.recipe).subscribe ((next) => {
       this.alertify.success('New recipe Added');
     }, error => {
      this.alertify.error(error);
     });
  }
  addIngredient(index: number) {

   this.recipe.ingredients.splice(index + 1, 0, {});
   this.ingredientsLength = this.recipe.ingredients.length;
  }
  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
    this.ingredientsLength = this.recipe.ingredients.length;
  }

  addStep(index: number) {
    this.recipe.steps.splice(index + 1, 0, {});
    this.stepsLength = this.recipe.steps.length;
  }
  removeStep(index: number) {
    this.recipe.steps.splice(index, 1);
    this.stepsLength = this.recipe.steps.length;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  customTrackBy(index: number, obj: any): any {
    return index;
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
  }


}

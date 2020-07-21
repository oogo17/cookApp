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
     ingredients: [{id: 0}],
     steps: [{}]
   };


  ingredientsLength = this.recipe.ingredients.length;
  stepsLength = this.recipe.steps.length;

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    this.recipe.allowShare = true;

    console.log(this.recipe);
  }

  createRecipe() {


    console.log(this.recipe);

  }
  addIngredient(index: number) {
    this.recipe.ingredients.splice(index + 1, 0, {id: index + 1});
    this.ingredientsLength = this.recipe.ingredients.length;
  }
  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
    this.ingredientsLength = this.recipe.ingredients.length;
  }

  addStep(index: number, step: {}) {
    console.log(step);
    console.log(this.recipe.steps);
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

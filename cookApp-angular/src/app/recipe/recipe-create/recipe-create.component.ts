
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/_models/Recipe';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
 // items = [0];
   recipe: any = {
     ingredients: [{id: 0}],
     steps: [{}]
   };


  ingredientsLength = this.recipe.ingredients.length;
  stepsLength = this.recipe.steps.length;

  constructor() {

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

}

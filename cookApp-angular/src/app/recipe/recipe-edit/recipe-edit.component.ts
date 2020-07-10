import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/_models/Recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadUser();
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
}

import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/_models/Recipe';

@Component({
  selector: 'app-fallow-user-recipe-detail',
  templateUrl: './fallow-user-recipe-detail.component.html',
  styleUrls: ['./fallow-user-recipe-detail.component.css']
})
export class FallowUserRecipeDetailComponent implements OnInit {
  recipeId: number;
  recipe: Recipe;
  fallowUser: number;

  constructor(private route: ActivatedRoute, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    this.recipeId = +this.route.snapshot.params['id'];
    // tslint:disable-next-line:no-string-literal
    this.fallowUser = +this.route.snapshot.params['id2'];

    console.log(this.fallowUser);

    this.userService.getRecipe(this.recipeId).subscribe( recipe => {
      this.recipe = recipe;
      console.log(this.recipe);
    }, error => {
      this.alertify.error(error);
    });

  }

}

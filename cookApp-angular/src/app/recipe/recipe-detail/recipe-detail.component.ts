import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Recipe } from 'src/app/_models/Recipe';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    // tslint:disable-next-line:no-string-literal
    this.userService.getRecipe(+this.route.snapshot.params['id']).subscribe((recipe: Recipe) => {
      this.recipe = recipe;
      // console.log(recipe);
    }, error => {
      this.alertify.error(error);
    });
  }


}

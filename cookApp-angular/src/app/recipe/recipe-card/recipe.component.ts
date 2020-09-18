import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/_models/Recipe';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input() recipe: Recipe;
  @Output() recipeId = new EventEmitter();
  rate = 2;
  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {

  }

  removeRecipe(id: number) {
    this.alertify.confirm('Are you sure you want to delete the Recipe!!', () => {
      this.userService.deleteRecipe(id).subscribe((next) => {
        this.recipeId.emit(id);
        this.alertify.success('Recipe deleted!!');
      }, error => {
          this.alertify.error(error);
      });
    });


  }

}

import { Filters } from './../../_models/filters';
import { RecipeService } from './../../_services/recipe.service';
import { Pagination, PaginatedResults } from './../../_models/Pagination';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from './../../_models/Recipe';
import { User } from './../../_models/User';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  idUser = this.auth.decodedToken.nameid;
  recipes: Recipe[];
  pagination: Pagination;
  filters: Filters[];
  user: User;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private recipe: RecipeService
  ) {

  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      // tslint:disable-next-line:no-string-literal
      this.recipes = data['recipe'].result;
      this.pagination = data.recipe.pagination;
    });

    this.recipe.currentFilters.subscribe(filter => {
      console.log(filter);
      this.filters = filter;
      if (this.filters != null) {
        this.loadRecipes();
      }
    });
  }


  loadRecipes() {

    this.userService.getRecipes(this.idUser, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.filters).subscribe((res: PaginatedResults<Recipe[]>) => {
     this.recipes = res.result;
     this.pagination = res.pagination;
    //  console.log(user);
    //  console.log(this.recipes);
   }, error => {
     this.alertify.error(error);
   });
  }

  deleteRecipe(id) {
    const index = this.recipes.findIndex(x => x.id === id);
    this.recipes.splice(index, 1);
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    this.loadRecipes();

  }

}

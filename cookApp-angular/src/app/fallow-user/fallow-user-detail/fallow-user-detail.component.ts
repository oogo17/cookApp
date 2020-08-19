import { FollowUsers } from './../../_models/FollowUsers';
import { FallowUserService } from './../../_services/fallowUser.service';
import { AuthService } from './../../_services/auth.service';
import { AlertifyService } from './../../_services/alertify.service';
import { Pagination, PaginatedResults } from './../../_models/Pagination';
import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filters } from 'src/app/_models/filters';
import { Recipe } from 'src/app/_models/Recipe';
import { User } from 'src/app/_models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-fallow-user-detail',
  templateUrl: './fallow-user-detail.component.html',
  styleUrls: ['./fallow-user-detail.component.css'],
})
export class FallowUserDetailComponent implements OnInit {
  userId: number;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 6;
  filters: Filters[];
  recipes: Recipe[];
  users: User[];
  fallowUsers: FollowUsers[];
  unFallowUserId: number;
  selectedUser: User;
  userTokenId: number;
  recipeId: number;
  currentlyFallow = false;

  constructor(
    private routeAct: ActivatedRoute,
    private route: Router,
    private userService: UserService,
    private fallowUserService: FallowUserService,
    private alertify: AlertifyService,
    private auth: AuthService
  ) {}

  ngOnInit() {

    this.routeAct.data.subscribe((data) => {
      this.fallowUsers = data.fallowUsers;
      this.recipes = data.recipe.result;
      this.pagination = data.recipe.pagination;
      this.users = data.users;
    });
    this.userTokenId = this.auth.decodedToken.nameid;

    this.routeAct.params.subscribe((params) => {

      this.userId = +params.id;
      this.selectedUser = this.users.find(x => x.id === this.userId);
      const fallowUser = this.fallowUsers.find(x => x.username === this.selectedUser.userName);

      if (fallowUser)  {
        this.currentlyFallow = true;
        this.unFallowUserId = fallowUser.id;
      }
    });
  }

  loadRecipes() {
    this.userService
      .getRecipes(this.userId, this.pageNumber, this.pageSize, this.filters)
      .subscribe(
        (res: PaginatedResults<Recipe[]>) => {
          this.recipes = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }




  fallowUser(id: number) {
    this.fallowUserService.createFallowUser(id).subscribe( res => {
      this.alertify.success(`You Fallow ${this.selectedUser.userName}`);
      this.currentlyFallow = true;
    }, error => {
      this.alertify.error(error);
    });
  }

  UnFallowUser(id: number) {
     this.fallowUserService.deleteFallowUser(id).subscribe( res => {
        this.alertify.success(`You Stop Fallow ${this.selectedUser.userName}`);
        this.route.navigate(['/home/', this.userTokenId]);
     }, error => {
        this.alertify.error(error);
     });

  }

  addRecipe(recipe: Recipe) {
    console.log(recipe.id);
    this.fallowUserService.createRecipeFromFallowUser(recipe.id).subscribe (res => {
      this.alertify.success(`You Add New Recipe`);
    }, error => {
      this.alertify.error(error);
    });

  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadRecipes();
  }
}

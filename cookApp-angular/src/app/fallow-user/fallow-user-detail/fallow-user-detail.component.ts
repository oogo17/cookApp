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
  user: User[];
  selectedUser: User;
  userTokenId: number;
  recipeId: number;

  constructor(
    private routeAct: ActivatedRoute,
    private userService: UserService,
    private fallowUserService: FallowUserService,
    private alertify: AlertifyService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.userTokenId = this.auth.decodedToken.nameid;

    console.log(this.auth.decodedToken.nameid);

    this.routeAct.params.subscribe((params) => {
      this.userId = +params.id;
      console.log(this.userId);
      this.loadRecipes();
      this.loadUser();
    });
  }

  loadRecipes() {
    this.userService
      .getRecipes(this.userId, this.pageNumber, this.pageSize, this.filters)
      .subscribe(
        (res: PaginatedResults<Recipe[]>) => {
          this.recipes = res.result;
          this.pagination = res.pagination;
          console.log(this.pagination);
          console.log(this.recipes);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
  loadUser() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.user = users;
        this.selectedUser = this.user.find((x) => x.id === this.userId);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  fallowUser(id: number) {
    this.fallowUserService.createFallowUser(id).subscribe( res => {
      this.alertify.success('You Fallow New User');
    }, error => {
      this.alertify.error(error);
    });
  }

  addRecipe(recipe: Recipe) {

  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadRecipes();
  }


}

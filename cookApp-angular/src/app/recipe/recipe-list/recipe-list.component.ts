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
  user: User;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private auth: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
   this.userService.getUser(this.idUser).subscribe((user: User) => {
     this.user = user;
     this.recipes = user.recipes;
    //  console.log(user);
    //  console.log(this.recipes);
   }, error => {
     this.alertify.error(error);
   });
  }

}
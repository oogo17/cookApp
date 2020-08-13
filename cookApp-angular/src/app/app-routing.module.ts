import { FallowUserDetailGetUsersResolver } from './_resolvers/fallow-user-detail-GetUsers.resolver';
import { FallowUserRecipeListResolver } from './_resolvers/fallow-user-recipeList.resolver';
import { FallowUserDetailResolver } from './_resolvers/fallow-user-detail.resolver';
import { FallowUserRecipeDetailComponent } from './fallow-user/fallow-user-recipe-detail/fallow-user-recipe-detail.component';
import { PreventUnsaveChanges } from './_guards/prevent-unsave-changes.guard';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { RecipeDetailResolver } from './_resolvers/recipe-detail.resolver';

import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { FallowUserListComponent } from './fallow-user/fallow-user-list/fallow-user-list.component';
import { ContainerListComponent } from './container-list/container-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { FilterRecipesComponent } from './filter-recipes/filter-recipes.component';
import { RecipeCreateComponent } from './recipe/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeEditResolver } from './_resolvers/recipe-edit.resolver';
import { RecipeListResolver } from './_resolvers/recipe-list.resolver';
import { FollowUsersResolver } from './_resolvers/follow-users.resolver';
import { FallowUserDetailComponent } from './fallow-user/fallow-user-detail/fallow-user-detail.component';


const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'home/:id', component: ContainerListComponent, canActivate: [AuthGuard],
    children: [
      {path: '', component: RecipeListComponent, outlet: 'recipes', canActivate: [AuthGuard], resolve: {recipe: RecipeListResolver}},
      {path: '', component: FilterRecipesComponent, outlet: 'filter', canActivate: [AuthGuard]},
      {path: '', component: FallowUserListComponent, outlet: 'fallow-user', canActivate: [AuthGuard],
        resolve: {user: FollowUsersResolver}}
    ]
  },
  // {path: 'recipes', component: RecipeListComponent, canActivate: [AuthGuard]},
  {path: 'fallowUser/:id', component: FallowUserDetailComponent, canActivate: [AuthGuard],
     resolve: {fallowUsers: FallowUserDetailResolver, recipe: FallowUserRecipeListResolver, users: FallowUserDetailGetUsersResolver}},
  {path: 'fallowUser/recipe/:id2/:id', component: FallowUserRecipeDetailComponent, canActivate: [AuthGuard]},
  {path: 'recipeDetail/:id', component: RecipeDetailComponent, canActivate: [AuthGuard], resolve: {recipe: RecipeDetailResolver}},
  {path: 'recipeCreate', component: RecipeCreateComponent, canActivate: [AuthGuard]},
  {path: 'recipeEdit/:id', component: RecipeEditComponent, canActivate: [AuthGuard], resolve: {recipe: RecipeEditResolver}},
  {path: 'userEdit/:id', component: UserEditComponent, canActivate: [AuthGuard],
   resolve: {user: UserEditResolver}, canDeactivate: [PreventUnsaveChanges]},
  {path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

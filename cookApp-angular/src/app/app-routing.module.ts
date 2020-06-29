import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { FallowUserListComponent } from './fallow-user-list/fallow-user-list.component';
import { ContainerListComponent } from './container-list/container-list.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'recipes', component: RecipeListComponent, canActivate: [AuthGuard] },
  {path: 'fallowUser-list', component: FallowUserListComponent, canActivate: [AuthGuard] },
  {path: 'container', component: ContainerListComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

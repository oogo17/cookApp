import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { FallowUserListComponent } from './fallow-user-list/fallow-user-list.component';
import { ContainerListComponent } from './container-list/container-list.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'recipes', component: RecipeListComponent},
  {path: 'fallowUser-list', component: FallowUserListComponent },
  {path: 'container', component: ContainerListComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

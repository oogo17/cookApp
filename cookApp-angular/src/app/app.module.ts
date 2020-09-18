import { ReviewsService } from './_services/reviews.service';
import { ReviewDetailComponent } from './reviews/review-detail/review-detail.component';
import { ReviewListComponent } from './reviews/review-list/review-list.component';
import { NotificationService } from './_services/notification.service';
import { FallowUserDetailGetUsersResolver } from './_resolvers/fallow-user-detail-GetUsers.resolver';
import { FallowUserRecipeListResolver } from './_resolvers/fallow-user-recipeList.resolver';
import { FallowUserDetailResolver } from './_resolvers/fallow-user-detail.resolver';
import { FallowUserService } from './_services/fallowUser.service';
import { FallowUserRecipeDetailComponent } from './fallow-user/fallow-user-recipe-detail/fallow-user-recipe-detail.component';

import { RecipeService } from './_services/recipe.service';
import { CountriesAPIService } from './_services/countriesAPI.service';
import { FollowUsersResolver } from './_resolvers/follow-users.resolver';
import { RecipeEditResolver } from './_resolvers/recipe-edit.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsaveChanges } from './_guards/prevent-unsave-changes.guard';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RatingModule } from 'ngx-bootstrap/rating';
import { JwtModule } from '@auth0/angular-jwt';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { ErrorInterceptorProvider } from './_services/errorInterceptor.service';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeComponent} from './recipe/recipe-card/recipe.component';
import { FallowUserListComponent } from './fallow-user/fallow-user-list/fallow-user-list.component';
import { FallowUserDetailComponent } from './fallow-user/fallow-user-detail/fallow-user-detail.component';
import { ContainerListComponent } from './container-list/container-list.component';
import { FilterRecipesComponent } from './filter-recipes/filter-recipes.component';
import { FilterAdvancedSearchModalComponent } from './filter-recipes/filter-advancedSearch-modal/filter-advancedSearch-modal.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeCreateComponent } from './recipe/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeDetailResolver } from './_resolvers/recipe-detail.resolver';
import { RecipeListResolver } from './_resolvers/recipe-list.resolver';
import { FileUploadModule } from 'ng2-file-upload';



export function tokenGetter() {
  return localStorage.getItem('token');
}



@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      UserEditComponent,
      RecipeListComponent,
      RecipeComponent,
      RecipeDetailComponent,
      RecipeCreateComponent,
      RecipeEditComponent,
      FallowUserListComponent,
      FallowUserDetailComponent,
      FallowUserRecipeDetailComponent,
      ContainerListComponent,
      FilterRecipesComponent,
      ReviewListComponent,
      ReviewDetailComponent,
      FilterAdvancedSearchModalComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      PaginationModule.forRoot(),
      FileUploadModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ModalModule.forRoot(),
      BsDatepickerModule.forRoot(),
      RatingModule.forRoot(),
      MatSelectModule,
      MatToolbarModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatAutocompleteModule,
      MatDialogModule,
      ReactiveFormsModule,
      NgxMatSelectSearchModule,
      MatCheckboxModule,
      MatRadioModule,
      MatBadgeModule,
      MatCardModule,
      BsDropdownModule.forRoot(),
      JwtModule.forRoot({
        config: {
          // tslint:disable-next-line:object-literal-shorthand
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:5000'],
          blacklistedRoutes: ['localhost:5000/api/auth']
        }
      })
   ],
   providers: [
      AuthService,
      FallowUserService,
      CountriesAPIService,
      RecipeService,
      NotificationService,
      ReviewsService,
      ErrorInterceptorProvider,
      RecipeDetailResolver,
      UserEditResolver,
      RecipeEditResolver,
      RecipeListResolver,
      FollowUsersResolver,
      FallowUserDetailResolver,
      FallowUserDetailGetUsersResolver,
      FallowUserRecipeListResolver,
      PreventUnsaveChanges,
      AuthGuard
   ],
   entryComponents: [
    FilterAdvancedSearchModalComponent
  ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

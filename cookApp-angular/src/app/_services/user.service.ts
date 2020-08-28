import { Password } from './../_models/Password';
import { Filters } from './../_models/filters';
import { map } from 'rxjs/operators';
import { PaginatedResults } from './../_models/Pagination';
import { Recipe } from './../_models/Recipe';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

const httpOption = {
  headers: new HttpHeaders ({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;


constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'users');
}

getUser(id: number): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'users/' + id , user);
}

updatePassword(id: number, passwords: Password) {
  console.log(passwords);
  return this.http.put(this.baseUrl + 'users/' + id + '/updatepassword', passwords);
}

getRecipe(id: number): Observable<Recipe> {
  return this.http.get<Recipe>(this.baseUrl + 'recipes/' + id);
}

getRecipes(id: number, page?, itemsPerPage?, filters?: Filters[]): Observable <PaginatedResults<Recipe[]>> {
  const paginatedResults: PaginatedResults<Recipe[]> = new PaginatedResults<Recipe[]>();
  let params = new HttpParams();
  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);

  }
  if (filters != null) {
    console.log('entra');
    filters.forEach( item => {
      params = params.append(item.name, item.value);
    });

  }
  return this.http.get<Recipe[]>(this.baseUrl + 'recipes/' + id + '/all', { observe: 'response', params} )
          .pipe(
            map(response => {
              paginatedResults.result = response.body;
              if (response.headers.get('Pagination') != null) {
                paginatedResults.pagination = JSON.parse(response.headers.get('Pagination'));
              }
              return paginatedResults;
            })
          );
}

updateRecipe(id: number, recipe: Recipe) {
  return this.http.put(this.baseUrl + 'recipes/' + id, recipe);
}

createRecipe(recipe: Recipe) {
  return this.http.post(this.baseUrl + 'recipes', recipe);
}

deleteRecipe(id: number) {
  return this.http.delete(this.baseUrl + 'recipes/' + id, httpOption);
}

}

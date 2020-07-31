import { Recipe } from './../_models/Recipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

getRecipe(id: number): Observable<Recipe> {
  return this.http.get<Recipe>(this.baseUrl + 'recipes/' + id);
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

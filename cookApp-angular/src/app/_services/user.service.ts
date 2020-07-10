import { Recipe } from 'src/app/_models/Recipe';
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
  return this.http.get<User[]>(this.baseUrl + 'users', httpOption);
}

getUser(id: number): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id, httpOption);
}

getRecipe(id: number): Observable<Recipe> {
  return this.http.get<Recipe>(this.baseUrl + 'recipes/' + id, httpOption);
}

}

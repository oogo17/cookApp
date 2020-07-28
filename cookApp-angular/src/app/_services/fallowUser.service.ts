import { Observable } from 'rxjs';
import { FollowUsers } from './../_models/FollowUsers';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const httpOption = {
  headers: new HttpHeaders ({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class FallowUserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getFollowUsers(id: number): Observable<FollowUsers[]>  {
return this.http.get<FollowUsers[]>(this.baseUrl + 'user/' + id + '/followUser', httpOption);
}

}

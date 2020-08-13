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

getFollowUsers(): Observable<FollowUsers[]>  {
return this.http.get<FollowUsers[]>(this.baseUrl + 'followusers');
}

createFallowUser(id: number) {
  return this.http.post(this.baseUrl + 'followusers/' + id, id);

}

deleteFallowUser(id: number) {
  return this.http.delete(this.baseUrl + 'followusers/' + id);
}

}

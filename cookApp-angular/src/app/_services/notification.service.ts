import { Notification } from './../_models/Notification';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getNotifications(id: number): Observable<Notification[]> {
  return this.http.get<Notification[]>(this.baseUrl + 'notifications/' + id);
}

}

import { Review } from './../_models/Review';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

getReviews(recipeId: number): Observable<Review[]> {
  return this.http.get<Review[]>(this.baseUrl + 'reviews/' + recipeId );
}

createReview(review: Review) {
  return this.http.post(this.baseUrl + 'reviews ', review);
}

}

import { AlertifyService } from './../../_services/alertify.service';
import { ReviewsService } from './../../_services/reviews.service';
import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/_models/Review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
reviews: Review[];
@Input() recipeId: any;


  constructor(private reviewService: ReviewsService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    console.log(this.recipeId);
    this.reviewService.getReviews(this.recipeId).subscribe(reviews => {
      this.reviews = reviews;
      console.log(this.reviews);
    }, error => {
      this.alertifyService.error(error);
    });

  }

}

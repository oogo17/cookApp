import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewsService } from 'src/app/_services/reviews.service';
import { Review } from 'src/app/_models/Review';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.css']
})
export class ReviewAddComponent implements OnInit {
  reviewForm: FormGroup;
  review: Review;
  @Input() recipeId: number;
  userId: number;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private reviewService: ReviewsService
  ) { }

  ngOnInit() {
    this.createReviewForm();
    this.userId = this.userId = this.auth.decodedToken.nameid;
  }

  createReviewForm() {
    this.reviewForm = this.formBuilder.group({
      rate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createReview() {
    if (this.reviewForm.valid) {
      this.review = this.reviewForm.value;
      this.review.recipeId = this.recipeId;
      this.review.userId = this.userId;

      this.reviewService.createReview(this.review).subscribe( data => {
        this.alertify.success('New Review');
        this.reviewForm.reset();
        this.reviewForm.updateValueAndValidity();
      }, error => {
        this.alertify.error(error);
        this.reviewForm.reset();
        this.reviewForm.updateValueAndValidity();
      });
    }
  }
}

import { Review } from './../../_models/Review';
import { ReviewsService } from './../../_services/reviews.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Recipe } from 'src/app/_models/Recipe';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  userId: any;
  rate = 0;
  reviewForm: FormGroup;
  review: Review;
  recipeId: any;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private reviewService: ReviewsService
  ) {}

  ngOnInit() {
    // this.loadUser();
    this.route.data.subscribe((data) => {
      // tslint:disable-next-line:no-string-literal
      this.recipe = data['recipe'];
    });
    this.recipeId = +this.route.snapshot.params.id;
    this.userId = this.auth.decodedToken.nameid;
    this.createReviewForm();
  }

  loadUser() {
    // tslint:disable-next-line:no-string-literal
    this.userService.getRecipe(+this.route.snapshot.params['id']).subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
        // console.log(recipe);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
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
      this.review.recipeId = this.recipe.id;
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

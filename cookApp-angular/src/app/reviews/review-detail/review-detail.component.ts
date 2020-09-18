import { Review } from 'src/app/_models/Review';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss']
})
export class ReviewDetailComponent implements OnInit {

@Input() reviewDetail: Review;
  constructor() { }

  ngOnInit() {
    console.log(this.reviewDetail);
  }

}

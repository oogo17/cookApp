import { AdvancedSearch } from './../../_models/AdvancedSearch';
import { Component, OnInit, Inject } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-filter-advancedSearch-modal',
  templateUrl: './filter-advancedSearch-modal.component.html',
  styleUrls: ['./filter-advancedSearch-modal.component.scss']
})
export class FilterAdvancedSearchModalComponent implements OnInit {
  foodTypes: any;
  foodProtein: any;
  foodPrice: any;
  foodDiet: any;


  constructor() {
    const advanceS = new AdvancedSearch();
    this.foodTypes = advanceS.foodType;
    this.foodProtein = advanceS.foodProtein;
    this.foodPrice = advanceS.foodPrice;
    this.foodDiet = advanceS.foodDiet;

  }


  ngOnInit() {





  }

}

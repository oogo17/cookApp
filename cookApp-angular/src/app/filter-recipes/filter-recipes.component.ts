import { Filters } from './../_models/filters';
import { RecipeService } from './../_services/recipe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-recipes',
  templateUrl: './filter-recipes.component.html',
  styleUrls: ['./filter-recipes.component.css']
})
export class FilterRecipesComponent implements OnInit {
  typeSlected: string;
  types: any [];
  filter: Filters[];
  advancedSearch = false;
  constructor(private recipe: RecipeService) { }

  ngOnInit() {
    this.types = ['American', 'Italian', 'Japanese', 'Mexican', 'German', 'French', 'All' ];
    this.typeSlected = 'All';
    this.filter = [];
  }

  byType(type: string) {
    this.typeSlected = type.toLowerCase();
    console.log(this.typeSlected);

    const index = this.filter.findIndex(x => x.name === 'type');


    if (this.typeSlected === 'all') {
      this.filter.splice(index, 1);
      this.recipe.updateFilters(this.filter);
      return;
    }

    index >= 0 ?
    this.filter[index].value = this.typeSlected :
    this.filter.push({name: 'type', value: this.typeSlected});


    this.recipe.updateFilters(this.filter);
  }
  byName(event) {
    console.log(event.target.value);
    const index = this.filter.findIndex(x => x.name === 'recipename');

    index >= 0 ?
    this.filter[index].value = event.target.value :
    this.filter.push({name: 'recipename', value: event.target.value});

    this.recipe.updateFilters(this.filter);
  }
  advancedSearchToggle() {
    this.advancedSearch = !this.advancedSearch;
  }
}

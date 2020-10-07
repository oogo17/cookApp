import { FilterAdvancedSearchModalComponent } from './filter-advancedSearch-modal/filter-advancedSearch-modal.component';
import { Filters } from './../_models/filters';
import { RecipeService } from './../_services/recipe.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


export interface AutoComplete {
  type: string;
  value: string;
  id: number;
 }

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
  filteredUserAndRecipes: Observable<[]>;
  control = new FormControl();
  autoComplete: AutoComplete;
  constructor(private recipe: RecipeService, public dialog: MatDialog) { }

  ngOnInit() {
    this.setAutoCompleteValues();
    this.types = ['American', 'Italian', 'Japanese', 'Mexican', 'German', 'French', 'All' ];
    this.typeSlected = 'All';
    this.filter = [];
    this.filteredUserAndRecipes = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

  }

  setAutoCompleteValues() {


  }

  private _filter(value: string): any {
    const filterValue = this._normalizeValue(value);
    if (this.types) {
      return this.types.filter((res) =>
      this._normalizeValue(res).includes(filterValue)
    );
    }

  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
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
    this.dialog.open(FilterAdvancedSearchModalComponent);

  }
  SelectedUserOrRecipe() {

  }
}

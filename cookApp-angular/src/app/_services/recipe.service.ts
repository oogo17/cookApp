import { Filters } from './../_models/filters';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  filters = new BehaviorSubject<Filters[]>(undefined);
  currentFilters = this.filters.asObservable();

constructor() { }

updateFilters(filters: Filters[]) {
  this.filters.next(filters);
}

}

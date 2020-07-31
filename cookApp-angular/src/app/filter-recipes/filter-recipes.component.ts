import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-recipes',
  templateUrl: './filter-recipes.component.html',
  styleUrls: ['./filter-recipes.component.css']
})
export class FilterRecipesComponent implements OnInit {
  typeSlected: string;
  types: any [];
  constructor() { }

  ngOnInit() {
    this.types = ['American', 'Italian', 'Japanese', 'Mexican', 'All' ];
    this.typeSlected = 'All';
  }

  typeOption(type: string) {
    this.typeSlected = type;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})



export class RecipeListComponent implements OnInit {
   items: any = ['Apple', 'Orange', 'Banana', 'grape', 'apple'];
  constructor() { }

  ngOnInit() {
  }


}

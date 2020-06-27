import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 registerMode = false;
 registerApproved = false;
  constructor() { }

  ngOnInit() {
  }
  registerToggle() {
    this.registerMode = true;

  }

  cancelRegistrationMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  registrationApprovedMode(registerApproved: boolean) {
   this.registerApproved = registerApproved;
   this.registerMode = false;
  }
}

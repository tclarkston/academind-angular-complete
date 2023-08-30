import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') signUpForm: NgForm


  defaultSub = "advanced";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitLogin(form: NgForm) {
    console.log(form);
  }
}

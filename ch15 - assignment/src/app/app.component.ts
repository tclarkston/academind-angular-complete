import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  genders = ['Male', 'Female'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),  
      }),
      'gender': new FormControl('female'),
    });

    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value);
    })

    // this.signupForm.statusChanges.subscribe((value) => {
    //   console.log(value);
    // })
  }

  onSubmit(): void {
   console.log(this.signupForm); 
  }
}

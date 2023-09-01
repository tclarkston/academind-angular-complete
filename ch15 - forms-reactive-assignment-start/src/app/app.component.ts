import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  forbiddenNames = ['Test'];

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, CustomValidators.invalidProjectName], CustomValidators.asyncInvalidProjectName),
      'emailAddress': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('critical'),
    });

    this.projectForm.valueChanges.subscribe((value) => {
      console.log(value);
    })

    this.projectForm.statusChanges.subscribe((value) => {
      console.log(value);
    })
  }

  validateProjectName(control: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve) => {
      setTimeout(() => {
        if (this.forbiddenNames.indexOf(control.value)){
          resolve({'projectNameTaken': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }


  onSubmit(): void {
    console.log(this.projectForm);
  }
}

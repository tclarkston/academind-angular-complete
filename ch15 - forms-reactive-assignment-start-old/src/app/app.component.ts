import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  forbiddenNames: string[] = ['Test']

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl<any>('', { validators: Validators.required, asyncValidators: this.validateProjectName() }),
      'emailAddress': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(''),
    });

    this.projectForm.valueChanges.subscribe((value) => {
      console.log(value);
    })

    // this.projectForm.statusChanges.subscribe((value) => {
    //   console.log(value);
    // })
  }

  // validateProjectName(): AsyncValidatorFn{
  //   return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  //    return setInterval(){

  //     };  
  //   }


  onSubmit(): void {
    console.log(this.projectForm);
  }
}

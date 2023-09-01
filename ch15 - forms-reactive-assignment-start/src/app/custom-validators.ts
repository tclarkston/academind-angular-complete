import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidators {
  static invalidProjectName(control: FormControl) : {[s: string]: boolean}{
    if (control.value ==='Test' || control.value ==='test'){
      return { 'invalidProjectName': true }
    } else {
      return null;
    }
  }

  static asyncInvalidProjectName(control: FormControl) : Promise<any> | Observable<any> {
   const promise = new Promise((resolve) => {
    setTimeout(() => {
      if (control.value.toLowerCase() ==='testproject'){
        resolve({'invalidProjectName': true} )
      } else {
        resolve(null);
      }
    }, 1500);
   });

   return promise;
  }
}
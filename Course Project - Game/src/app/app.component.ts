import { Component } from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
oddNumbers: number[] = [];
evenNumbers: number[] = []

onIntervalFired(firedData: any) {
  if (firedData % 2 === 0){
    this.evenNumbers.push(firedData);
  }
  else {
    this.oddNumbers.push(firedData)  
  }
}


}

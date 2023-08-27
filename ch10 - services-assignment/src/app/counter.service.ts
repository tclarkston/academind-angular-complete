import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  activeUserCounter = 0;
  inactiveUserCounter = 0;

  constructor() { }

  incrementActiveUsers(){
    this.activeUserCounter++;
    console.log("Active: ", this.activeUserCounter);
  }

  incrementInactiveUsers(){
    this.inactiveUserCounter++
    console.log("Inactive: ", this.inactiveUserCounter);
  }
}

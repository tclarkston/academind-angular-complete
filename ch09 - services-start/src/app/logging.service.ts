import { Injectable } from "@angular/core";

export class LoggingService {
  logStatusChange(change: string){
    console.log('A server status changed, new status: ' + change);
  }
}
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('outgoing request');
    console.log(req.url);
    console.log(req.headers);
    
    return next.handle(req).pipe(tap
      (event => {
        console.log(event);
        if (event.type === HttpEventType.Response){
          console.log('Response Arrived!');
          console.log(event.body);
        }
      }
    ));
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private intSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.intSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2){
          observer.complete();
        }
        if (count > 3){
          observer.error(new Error('Counter threw an error'));
        }
        count++;
      }, 1000)
    })

    this.intSubscription =  customIntervalObservable.pipe(filter((data: number) => {
      return data > 0;
    }), map((data: number) => {
      return `Round: ${ data + 1 }`;
    })).subscribe((data => {
        console.log(data);
      }),
      error => {
        console.log(error);
        alert(error);
      },
      () => {
        console.log('Complete');
      }
    )
  }

  ngOnDestroy(): void {
      this.intSubscription.unsubscribe();
  }
}
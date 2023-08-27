import { CounterService } from './counter.service';
import { Component, OnChanges, SimpleChanges} from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeUserCount;
  inActiveUserCount;
  
  constructor(private counterService: CounterService) {}
}

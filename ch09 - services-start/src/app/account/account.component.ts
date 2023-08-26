import { AccountService } from './../account.service';
import { Component, Input } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private service: LoggingService, private accountService: AccountService){}

  onSetTo(status: string) {
    this.accountService.onStatusChanged(this.id, status);
    // this.service.logStatusChange(status);
    this.accountService.statusUpdated.emit(status);
  }
}

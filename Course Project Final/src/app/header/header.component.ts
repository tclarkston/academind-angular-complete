import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() linkClicked = new EventEmitter<string>()

  onLinkClicked(page: string){
    this.linkClicked.emit(page);
  }
}

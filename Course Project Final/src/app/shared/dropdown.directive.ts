import { Directive, HostListener, HostBinding, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
 
  constructor(private tempRef: TemplateRef<any>, private viewRef: ViewContainerRef) { }
}

import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {
  @Output('appHover') hoverChange: EventEmitter<boolean> = new EventEmitter();

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    this.hoverChange.emit(true);
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.hoverChange.emit(false);
  }
}

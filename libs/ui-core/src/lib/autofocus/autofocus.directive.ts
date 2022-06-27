import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[uiAutofocus]',
})
export class AutofocusDirective {
  @Input('uiAutofocus')
  set shouldFocus(value: boolean | string) {
    // Because of the input alias, if no value is provided then the value defaults to an empty string
    const valueIsTrueOrEmpty = value || value === '';
    if (valueIsTrueOrEmpty) {
      this._setFocus();
    }
  }

  constructor(private _elementRef: ElementRef) {}

  private _setFocus(): void {
    setTimeout(() => this._elementRef.nativeElement.focus());
  }
}

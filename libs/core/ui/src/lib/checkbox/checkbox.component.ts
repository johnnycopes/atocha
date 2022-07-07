import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'atocha-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'core-ui-checkbox',
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CheckboxComponent,
    multi: true
  }]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() disabled = false;
  @Input() indeterminate = false;
  public checked = false;
  private _onChangeFn: (value: boolean) => void = () => undefined;

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  writeValue(value: boolean): void {
    this.checked = value;
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this._onChangeFn = fn;
  }

  registerOnTouched(fn: (value: boolean) => void): void {
    fn;
  }

  // TODO: set this up
  setDisabledState?(isDisabled: boolean): void;

  onChange(value: boolean): void {
    this.checked = value;
    this._onChangeFn(this.checked);
  }
}

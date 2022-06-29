import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CheckboxState } from '@atocha/globetrotter-types';

@Component({
  selector: 'ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() bold = false;
  @Input() invertColors = false;
  state: CheckboxState = 'unchecked';
  private _onChangeFn: (value: CheckboxState) => void = () => undefined;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  writeValue(value: CheckboxState): void {
    this.state = value;
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: CheckboxState) => void): void {
    this._onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnTouched(fn: (value: CheckboxState) => void): void {}

  onChange(): void {
    this.state = this.state !== 'checked' ? 'checked' : 'unchecked';
    this._onChangeFn(this.state);
  }
}

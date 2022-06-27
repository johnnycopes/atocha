import {
  Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';

export interface RadioButtonsOption<T> {
  display: string;
  value: T;
}

@Component({
  selector: 'ui-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioButtonsComponent,
      multi: true,
    },
  ],
})
export class RadioButtonsComponent<T> implements ControlValueAccessor {
  @Input() options: RadioButtonsOption<T>[] = [];
  @Input() stacked = false;
  model: RadioButtonsOption<T> | undefined;
  private _onChangeFn: (model: RadioButtonsOption<T>) => void = () => undefined;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public breakpointObserver: BreakpointObserver
  ) {}

  writeValue(obj: RadioButtonsOption<T>): void {
    this.model = obj;
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: () => void): void {
    this._onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  registerOnTouched(fn: () => void): void {}

  onChange(): void {
    if (this.model) {
      this._onChangeFn(this.model);
    }
  }
}

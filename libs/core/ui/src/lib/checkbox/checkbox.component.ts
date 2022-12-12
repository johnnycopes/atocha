import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export type CheckboxSize = 'normal' | 'large';

@Component({
  standalone: true,
  selector: 'core-checkbox',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() size: CheckboxSize = 'normal';
  @Input() disabled = false;
  @Input() indeterminate = false;

  checked = false;

  @HostBinding('attr.data-test')
  dataTestAttr = 'core-checkbox';

  private _onChangeFn: (value: boolean) => void = () => undefined;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  @HostBinding('class')
  get hostClasses(): Record<string, boolean> {
    return {
      'core-checkbox': true,
      'core-checkbox--checked': this.checked && !this.indeterminate,
      'core-checkbox--unchecked': !this.checked && !this.indeterminate,
      'core-checkbox--indeterminate': this.indeterminate,
      'core-checkbox--disabled': this.disabled,
    };
  }

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

  setDisabledState?(isDisabled: boolean): void;

  onChange(value: boolean): void {
    this.checked = value;
    this._onChangeFn(this.checked);
  }
}

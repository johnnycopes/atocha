import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { trackByFactory } from '@atocha/core/ui';

export interface RadioButtonsOption<T> {
  display: string;
  value: T;
}

@Component({
  standalone: true,
  selector: 'ui-radio-buttons',
  imports: [CommonModule, FormsModule],
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
  readonly trackByFn = trackByFactory<RadioButtonsOption<T>>(
    ({ display }) => display
  );
  private _onChangeFn: (model: RadioButtonsOption<T>) => void = () => undefined;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  writeValue(obj: RadioButtonsOption<T>): void {
    this.model = obj;
    this._changeDetectorRef.markForCheck();
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

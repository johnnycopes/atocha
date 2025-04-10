import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { trackBySelf } from '@atocha/core/ui';

type Range = [number, number];

@Component({
    selector: 'app-select-range',
    imports: [CommonModule, FormsModule],
    templateUrl: './select-range.component.html',
    styleUrls: ['./select-range.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectRangeComponent,
            multi: true,
        },
    ]
})
export class SelectRangeComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() options: readonly number[] = [];
  range: Range = [0, 0];
  readonly trackByFn = trackBySelf;

  private _onChangeFn: (value: Range) => void = () => undefined;

  writeValue(value: Range): void {
    this.range = value;
  }

  registerOnChange(fn: (value: Range) => void): void {
    this._onChangeFn = fn;
  }

  registerOnTouched(fn: (value: Range) => void): void {
    fn;
  }

  onMinChange(min: number): void {
    this.range = [min, this.range[1]];
    this._onChangeFn(this.range);
  }

  onMaxChange(max: number): void {
    this.range = [this.range[0], max];
    this._onChangeFn(this.range);
  }
}

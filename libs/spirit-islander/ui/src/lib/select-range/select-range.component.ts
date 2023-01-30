import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

type Range = [number, number];

@Component({
  selector: 'ui-select-range',
  standalone: true,
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
  ],
})
export class SelectRangeComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() options: number[] = [];
  range: Range = [0, 0];

  writeValue(value: Range): void {
    this.range = value;
  }

  registerOnChange(fn: (value: Range) => void): void {
    fn;
  }

  registerOnTouched(fn: (value: Range) => void): void {
    fn;
  }
}

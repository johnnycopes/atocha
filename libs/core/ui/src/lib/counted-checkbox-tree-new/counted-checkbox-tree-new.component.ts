/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  forwardRef,
  SimpleChanges,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { CheckboxSize } from '../checkbox/checkbox.component';
import { CheckboxTreeNewComponent } from '../checkbox-tree-new/checkbox-tree-new.component';
import { Counter, Counts } from './counter';

@Component({
  standalone: true,
  selector: 'core-counted-checkbox-tree-new',
  imports: [CommonModule, FormsModule, CheckboxTreeNewComponent],
  templateUrl: './counted-checkbox-tree-new.component.html',
  styleUrls: ['./counted-checkbox-tree-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'core-counted-checkbox-tree',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountedCheckboxTreeNewComponent),
      multi: true,
    },
  ],
})
export class CountedCheckboxTreeNewComponent<T>
  implements ControlValueAccessor, OnChanges
{
  @Input() item: T | undefined;
  @Input() getId: (item: T) => string = () => '';
  @Input() getChildren: (item: T) => T[] = () => [];
  @Input() getLeafItemCount: (item: T) => number = () => 0;
  @Input() itemTemplate: TemplateRef<unknown> | undefined;
  @Input() indentation = 24;
  @Input() size: CheckboxSize = 'normal';
  @Output() selectedChange = new EventEmitter<number>();
  @Output() totalChange = new EventEmitter<number>();
  model: string[] = [];
  selectedCounts: Counts = {};
  totalCounts: Counts = {};
  private _id = '';
  private _counter = new Counter<T>(
    this.getId,
    this.getChildren,
    this.getLeafItemCount
  );
  private _onChangeFn: (model: string[]) => void = () => [];

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges({ item }: SimpleChanges): void {
    if (item.currentValue) {
      const tree: T = item.currentValue;

      this._id = this.getId(tree);
      this._counter = new Counter<T>(
        this.getId,
        this.getChildren,
        this.getLeafItemCount
      );
      this.totalCounts = this._counter.getTotalCounts(tree);
      this.totalChange.emit(this.totalCounts[this._id]);

      this.writeValue(this.model);
    }
  }

  writeValue(model: string[]): void {
    if (model && this.item) {
      this.model = model;
      this.selectedCounts = this._counter.getSelectedCounts(
        this.item,
        this.model
      );
      this.selectedChange.emit(this.selectedCounts[this._id]);
    }
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (model: string[]) => void): void {
    this._onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnTouched(fn: (model: string[]) => void): void {}

  onChange(model: string[]): void {
    if (this.item) {
      this.model = model;
      this._onChangeFn(this.model);

      this.selectedCounts = this._counter.getSelectedCounts(
        this.item,
        this.model
      );
      this.selectedChange.emit(this.selectedCounts[this._id]);
    }
  }
}

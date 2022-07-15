/* eslint-disable @typescript-eslint/member-ordering */

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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { reduce } from 'lodash-es';

import { CheckboxStates } from '../nested-checkboxes/nested-checkboxes.component';

type Counts = Record<string, number>;

@Component({
  selector: 'core-nested-checkboxes-with-counts',
  templateUrl: './nested-checkboxes-with-counts.component.html',
  styleUrls: ['./nested-checkboxes-with-counts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'core-nested-checkboxes-with-counts',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NestedCheckboxesWithCountsComponent),
      multi: true,
    },
  ],
})
export class NestedCheckboxesWithCountsComponent<T>
  implements ControlValueAccessor, OnChanges
{
  @Input() item: T | undefined;
  @Input() getId: (item: T) => string = () => '';
  @Input() getChildren: (item: T) => T[] = () => [];
  @Input() getLeafItemCount: (item: T) => number = () => 0;
  @Input() itemTemplate: TemplateRef<unknown> | undefined;
  @Input() indentation = 24;
  @Output() selectedChange = new EventEmitter<number>();
  @Output() totalChange = new EventEmitter<number>();
  states: CheckboxStates = {};
  selectedCounts: Counts = {};
  totalCounts: Counts = {};
  private _id = '';
  private _onChangeFn: (value: CheckboxStates) => void = () => ({});

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges({ item }: SimpleChanges): void {
    if (item) {
      this._id = this.getId(item.currentValue);
    }
  }

  writeValue(value: CheckboxStates): void {
    if (!this.item) {
      return;
    }

    if (value) {
      this.states = value;
      this.selectedCounts = this._getSelectedCounts(this.item);
      this.selectedChange.emit(this.selectedCounts[this._id]);
      this.totalCounts = this._getTotalCounts(this.item);
      this.totalChange.emit(this.totalCounts[this._id]);
    }
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: CheckboxStates) => void): void {
    this._onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnTouched(fn: (value: CheckboxStates) => void): void {}

  onChange(states: CheckboxStates): void {
    if (!this.item) {
      return;
    }

    this.states = states;
    this._onChangeFn(this.states);

    this.selectedCounts = this._getSelectedCounts(this.item);
    this.selectedChange.emit(this.selectedCounts[this._id]);
  }

  private _getTotalCounts(item: T): Counts {
    return this._getCounts(item, this.getLeafItemCount);
  }

  private _getSelectedCounts(item: T): Counts {
    const leafNodeCount = (leafItem: T): number => {
      const leafItemId = this.getId(leafItem);
      return this.states[leafItemId] === 'checked'
        ? this.getLeafItemCount(leafItem)
        : 0;
    };
    return this._getCounts(item, leafNodeCount);
  }

  private _getCounts(item: T, getLeafItemCount: (item: T) => number): Counts {
    const id = this.getId(item);
    const children = this.getChildren(item);
    if (!children.length) {
      const count = getLeafItemCount(item);
      return { [id]: count };
    }
    const descendantTotals = children.reduce(
      (totalsDict, child) =>
        Object.assign(totalsDict, this._getCounts(child, getLeafItemCount)),
      {} as Counts
    );
    const grandTotal = reduce(
      children,
      (total, child) => {
        const childId = this.getId(child);
        const childTotal = descendantTotals[childId];
        return total + childTotal;
      },
      0
    );
    return {
      ...descendantTotals,
      [id]: grandTotal,
    };
  }
}

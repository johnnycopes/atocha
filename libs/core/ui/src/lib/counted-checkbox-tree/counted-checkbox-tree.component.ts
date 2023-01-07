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

import { CheckboxTreeNewComponent } from '../checkbox-tree/checkbox-tree.component';
import { Counter, Counts } from './counter';

@Component({
  standalone: true,
  selector: 'core-counted-checkbox-tree-new',
  imports: [CommonModule, FormsModule, CheckboxTreeNewComponent],
  templateUrl: './counted-checkbox-tree.component.html',
  styleUrls: ['./counted-checkbox-tree.component.scss'],
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
  @Input() node: T | undefined;
  @Input() getId: (node: T) => string = () => '';
  @Input() getChildren: (node: T) => T[] = () => [];
  @Input() getLeafNodeCount: (node: T) => number = () => 0;
  @Input() template: TemplateRef<unknown> | undefined;
  @Output() selectedChange = new EventEmitter<number>();
  @Output() totalChange = new EventEmitter<number>();
  model: string[] = [];
  selectedCounts: Counts = {};
  totalCounts: Counts = {};
  private _id = '';
  private _counter = new Counter<T>(
    this.getId,
    this.getChildren,
    this.getLeafNodeCount
  );
  private _onChangeFn: (model: string[]) => void = () => [];

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges({ node }: SimpleChanges): void {
    if (node.currentValue) {
      const tree: T = node.currentValue;

      this._id = this.getId(tree);
      this._counter = new Counter<T>(
        this.getId,
        this.getChildren,
        this.getLeafNodeCount
      );
      this.totalCounts = this._counter.getTotalCounts(tree);
      this.totalChange.emit(this.totalCounts[this._id]);

      this.writeValue(this.model);
    }
  }

  writeValue(model: string[]): void {
    if (model && this.node) {
      this.model = model;
      this.selectedCounts = this._counter.getSelectedCounts(
        this.node,
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
    if (this.node) {
      this.model = model;
      this._onChangeFn(this.model);

      this.selectedCounts = this._counter.getSelectedCounts(
        this.node,
        this.model
      );
      this.selectedChange.emit(this.selectedCounts[this._id]);
    }
  }
}

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

import { NewCounter as Counter, Counts } from '@atocha/core/util-selection';
import { SelectionTreeComponent } from '../selection-tree/selection-tree.component';

@Component({
  standalone: true,
  selector: 'core-counted-selection-tree',
  imports: [CommonModule, FormsModule, SelectionTreeComponent],
  templateUrl: './counted-selection-tree.component.html',
  styleUrls: ['./counted-selection-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'core-counted-selection-tree',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountedSelectionTreeComponent),
      multi: true,
    },
  ],
})
export class CountedSelectionTreeComponent<T>
  implements ControlValueAccessor, OnChanges
{
  @Input() tree: T | undefined;
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
    {} as T,
    this.getId,
    this.getChildren,
    this.getLeafNodeCount
  );
  private _onChangeFn: (model: string[]) => void = () => [];

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tree']) {
      const tree: T = changes['tree'].currentValue;

      this._id = this.getId(tree);
      this._counter = new Counter<T>(
        tree,
        this.getId,
        this.getChildren,
        this.getLeafNodeCount,
        this.model
      );
      this.totalCounts = this._counter.totalCounts;
      this.totalChange.emit(this.totalCounts[this._id]);

      this.writeValue(this.model);
    }
  }

  writeValue(model: string[]): void {
    if (model && this.tree) {
      this.model = model;
      this.selectedCounts = this._counter.update(this.model).selectedCounts;
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
    if (this.tree) {
      this.model = model;
      this._onChangeFn(this.model);

      this.selectedCounts = this._counter.update(model).selectedCounts;
      this.selectedChange.emit(this.selectedCounts[this._id]);
    }
  }
}

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

import {
  CountedSelectionTree,
  GetChildren,
  GetId,
  GetLeafCount,
  Ids,
} from '@atocha/tree/util';
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
  @Input() root: T | undefined;
  @Input() getId: GetId<T> = () => '';
  @Input() getChildren: GetChildren<T> = () => [];
  @Input() getLeafNodeCount: GetLeafCount<T> = () => 0;
  @Input() template: TemplateRef<unknown> | undefined;
  @Output() selectedChange = new EventEmitter<number>();
  @Output() totalChange = new EventEmitter<number>();
  ids: Ids = [];
  tree: CountedSelectionTree<T> = new CountedSelectionTree(
    {} as T,
    this.getId,
    this.getChildren,
    this.getLeafNodeCount
  );
  private _id = '';
  private _onChangeFn: (ids: Ids) => void = () => [];

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['root']) {
      const root: T = changes['root'].currentValue;

      this._id = this.getId(root);
      this.tree = new CountedSelectionTree(
        root,
        this.getId,
        this.getChildren,
        this.getLeafNodeCount,
        this.ids
      );
      this.totalChange.emit(this.tree.totalCounts[this._id]);

      this.writeValue(this.ids);
    }
  }

  writeValue(ids: Ids): void {
    if (ids && this.root) {
      this.ids = ids;
      this.tree.updateCounts(this.ids);
      this.selectedChange.emit(this.tree.selectedCounts[this._id]);
    }
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (ids: Ids) => void): void {
    this._onChangeFn = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnTouched(fn: (ids: Ids) => void): void {}

  onChange(ids: Ids): void {
    if (this.root) {
      this.ids = ids;
      this._onChangeFn(this.ids);

      this.tree.updateCounts(ids);
      this.selectedChange.emit(this.tree.selectedCounts[this._id]);
    }
  }
}

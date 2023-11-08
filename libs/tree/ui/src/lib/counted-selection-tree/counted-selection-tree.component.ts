import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
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
  CountableTree,
  GetChildren,
  GetId,
  GetLeafCount,
  Ids,
} from '@atocha/tree/util';
import { InternalCountedSelectionTreeComponent } from '../internal-counted-selection-tree/internal-counted-selection-tree.component';

@Component({
  standalone: true,
  selector: 'core-counted-selection-tree',
  imports: [CommonModule, FormsModule, InternalCountedSelectionTreeComponent],
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
  tree: CountableTree<T> = new CountableTree(
    {} as T,
    this.getId,
    this.getChildren,
    this.getLeafNodeCount
  );
  onChange: (ids: Ids) => void = () => [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['root']) {
      this.tree = new CountableTree(
        changes['root'].currentValue,
        this.getId,
        this.getChildren,
        this.getLeafNodeCount,
        this.ids
      );
      this.writeValue(this.ids);
    }
  }

  writeValue(ids: Ids | null): void {
    if (ids) {
      this.ids = ids;
      this.tree.updateCounts(this.ids);
    }
  }

  registerOnChange(fn: (ids: Ids) => void): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnTouched(fn: (ids: Ids) => void): void {}
}

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
  CountedSelectionTree,
  GetChildren,
  GetId,
  GetLeafCount,
  Ids,
} from '@atocha/tree/util';
import { InternalCountedSelectionTreeComponent } from '../internal-counted-selection-tree/internal-counted-selection-tree.component';
import {
  CountedSelectionTreeComponentAPI,
  CountedSelectionTreeNodeContext,
} from '../types';

@Component({
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
  implements
    CountedSelectionTreeComponentAPI<T>,
    ControlValueAccessor,
    OnChanges
{
  @Input({ required: true }) root!: T;
  @Input({ required: true }) getId: GetId<T> = () => '';
  @Input({ required: true }) getChildren: GetChildren<T> = () => [];
  @Input({ required: true }) getLeafCount: GetLeafCount<T> = () => 0;
  @Input() template?: TemplateRef<CountedSelectionTreeNodeContext<T>>;
  @Output() nodeClick = new EventEmitter<string>();
  @Output() selectedChange = new EventEmitter<number>();
  @Output() totalChange = new EventEmitter<number>();
  ids: Ids = [];
  tree: CountedSelectionTree<T> = new CountedSelectionTree(
    {} as T,
    this.getId,
    this.getChildren,
    this.getLeafCount
  );
  onChange: (ids: Ids) => void = () => [];

  ngOnChanges(changes: SimpleChanges): void {
    const root = changes['root']?.currentValue;
    if (root) {
      this.tree = new CountedSelectionTree(
        root,
        this.getId,
        this.getChildren,
        this.getLeafCount,
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

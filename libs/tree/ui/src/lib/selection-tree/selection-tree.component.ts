/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  forwardRef,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';

import { GetChildren, GetId, Ids, SelectionTree } from '@atocha/tree/util';
import { InternalSelectionTreeComponent } from '../internal-selection-tree/internal-selection-tree.component';
import { SelectionTreeComponentAPI } from '../types';

@Component({
  standalone: true,
  selector: 'core-selection-tree',
  imports: [CommonModule, FormsModule, InternalSelectionTreeComponent],
  templateUrl: './selection-tree.component.html',
  styleUrls: ['./selection-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'core-selection-tree',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectionTreeComponent),
      multi: true,
    },
  ],
})
export class SelectionTreeComponent<T>
  implements SelectionTreeComponentAPI<T>, OnChanges, ControlValueAccessor
{
  @Input() root: T | undefined;
  @Input() getId: GetId<T> = () => '';
  @Input() getChildren: GetChildren<T> = () => [];
  @Input() template: TemplateRef<unknown> | undefined;
  @Output() nodeClick = new EventEmitter<string>();
  ids: Ids = [];
  tree = new SelectionTree({} as T, this.getId, this.getChildren);
  onChange: (ids: Ids) => void = () => [];

  ngOnChanges(changes: SimpleChanges): void {
    const root = changes['root']?.currentValue;
    if (root) {
      this.tree = new SelectionTree(
        root,
        this.getId,
        this.getChildren,
        this.ids
      );
      this.writeValue(this.ids);
    }
  }

  writeValue(ids: Ids | null): void {
    if (ids) {
      this.ids = ids;
    }
  }

  registerOnChange(fn: (value: Ids) => void): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  registerOnTouched(_fn: (value: Ids) => void): void {}
}

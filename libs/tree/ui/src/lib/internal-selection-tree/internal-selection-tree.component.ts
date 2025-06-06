/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { ISelectionTree, Ids } from '@atocha/tree/util';
import { TreeComponent } from '../tree/tree.component';
import {
  InternalSelectionTreeComponentAPI,
  SelectionTreeNodeContext,
} from '../types';

@Component({
  selector: 'core-internal-selection-tree',
  imports: [CommonModule, TreeComponent],
  templateUrl: './internal-selection-tree.component.html',
  styleUrls: ['./internal-selection-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'core-selection-tree',
  },
})
export class InternalSelectionTreeComponent<T>
  implements InternalSelectionTreeComponentAPI<T>, OnChanges
{
  @Input({ required: true }) tree!: ISelectionTree<T>;
  @Input({ required: true }) ids: Ids = [];
  @Input() template?: TemplateRef<SelectionTreeNodeContext<T>>;
  @Output() nodeClick = new EventEmitter<string>();
  @Output() changed = new EventEmitter<Ids>();

  ngOnChanges(changes: SimpleChanges): void {
    const ids = changes['ids']?.currentValue;
    if (ids) {
      this.tree.updateMultiple(ids);
    }
  }

  onChange = (node: T): void => {
    const nodeId = this.tree.getId(node);
    this.nodeClick.emit(nodeId);
    this.changed.emit(this.tree.updateOne(nodeId).selectedIds);
  };
}

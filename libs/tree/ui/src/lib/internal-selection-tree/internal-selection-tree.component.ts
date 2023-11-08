/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Ids, Tree } from '@atocha/tree/util';
import { TreeComponent } from '../tree/tree.component';

@Component({
  standalone: true,
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
export class InternalSelectionTreeComponent<T> implements OnChanges {
  @Input({ required: true }) tree!: Tree<T>;
  @Input() ids: Ids = [];
  @Input() template: TemplateRef<unknown> | undefined;
  @Output() changed = new EventEmitter<Ids>();
  @Output() nodeClick = new EventEmitter<string>();

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ids']) {
      this.tree.updateMultiple(this.ids);
    }
  }

  onChange = (node: T): void => {
    const nodeId = this.tree.getId(node);
    this.nodeClick.emit(nodeId);
    console.log('ok', node);
    this.changed.emit(this.tree.updateOne(nodeId).array);
  };
}

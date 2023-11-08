import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { ICountedSelectionTree, Ids } from '@atocha/tree/util';
import { InternalSelectionTreeComponent } from '../internal-selection-tree/internal-selection-tree.component';
import { InternalCountedSelectionTreeComponentAPI } from '../types';

@Component({
  standalone: true,
  selector: 'core-internal-counted-selection-tree',
  imports: [CommonModule, InternalSelectionTreeComponent],
  templateUrl: './internal-counted-selection-tree.component.html',
  styleUrls: ['./internal-counted-selection-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'core-selection-tree',
  },
})
export class InternalCountedSelectionTreeComponent<T>
  implements InternalCountedSelectionTreeComponentAPI<T>, OnInit
{
  @Input({ required: true }) tree!: ICountedSelectionTree<T>;
  @Input({ required: true }) ids: Ids = [];
  @Input() template: TemplateRef<unknown> | undefined;
  @Output() changed = new EventEmitter<Ids>();
  @Output() nodeClick = new EventEmitter<string>();
  @Output() selectedChange = new EventEmitter<number>();
  @Output() totalChange = new EventEmitter<number>();
  private _rootId = '';

  ngOnInit(): void {
    this._rootId = this.tree.getId(this.tree.root);
    this.totalChange.emit(this.tree.totalCounts[this._rootId]);
  }

  onChange(ids: Ids): void {
    this.tree.updateCounts(ids);
    this.changed.emit(ids);
    this.selectedChange.emit(this.tree.selectedCounts[this._rootId]);
  }
}

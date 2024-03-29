/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { trackByFactory } from '@atocha/core/ui';
import { KanbanBoardFormComponent } from '../kanban-board-form/kanban-board-form.component';

export interface KanbanBoardActionClick {
  action: string;
  columnId: string;
}

export interface KanbanBoardItemAdd {
  item: string;
  columnId: string;
}

export interface KanbanBoardItemMove {
  itemId: string;
  currentColumnId: string;
  previousColumnId: string;
  currentIndex: number;
  previousIndex: number;
}

@Component({
  standalone: true,
  selector: 'app-kanban-board-column',
  imports: [
    CommonModule,
    DragDropModule,
    FaIconComponent,
    KanbanBoardFormComponent,
  ],
  templateUrl: './kanban-board-column.component.html',
  styleUrls: ['../kanban-board.scss', './kanban-board-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-kbc',
  },
})
export class KanbanBoardColumnComponent<TItem> {
  @Input() id = '';
  @Input() name = '';
  @Input() items: TItem[] = [];
  @Input() itemTemplate: TemplateRef<unknown> | undefined;
  @Input() itemUnit = 'Item';
  @Input() getItemId: (item: TItem) => string = () => '';
  @Input() actions: string[] = [];
  @Input() moving = false;
  @Output() itemAdd: EventEmitter<KanbanBoardItemAdd> = new EventEmitter();
  @Output() itemMove: EventEmitter<KanbanBoardItemMove> = new EventEmitter();
  @Output() actionClick: EventEmitter<KanbanBoardActionClick> =
    new EventEmitter();
  @Output() movingChange: EventEmitter<boolean> = new EventEmitter();
  readonly menuIcon = faEllipsisH;
  hoverStatesDict: Record<string, boolean> = {};
  trackByFn = trackByFactory(this.getItemId);

  onDragItem(): void {
    this.movingChange.emit(true);
  }

  onDropItem(event: CdkDragDrop<TItem[]>): void {
    const {
      item,
      previousIndex,
      currentIndex,
      previousContainer,
      container,
    }: CdkDragDrop<TItem[]> = event;
    if (previousContainer.id === container.id) {
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(
        previousContainer.data,
        container.data,
        previousIndex,
        currentIndex
      );
    }
    this.itemMove.emit({
      itemId: this.getItemId(item.data.item),
      previousColumnId: item.data.columnId,
      currentColumnId: this.id,
      previousIndex,
      currentIndex,
    });
    this.movingChange.emit(false);
  }

  onActionClick(action: string): void {
    this.actionClick.emit({
      action,
      columnId: this.id,
    });
  }

  onItemAdd(newItemName: string): void {
    this.itemAdd.emit({
      item: newItemName,
      columnId: this.id,
    });
  }
}

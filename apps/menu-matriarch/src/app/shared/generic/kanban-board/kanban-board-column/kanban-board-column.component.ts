import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Dictionary } from 'lodash';
import { trackByFactory } from '@utility/generic/track-by-factory';

export interface IKanbanBoardActionClick {
  action: string;
  columnId: string;
}

export interface IKanbanBoardItemAdd {
  item: string;
  columnId: string;
}

export interface IKanbanBoardItemMove {
  itemId: string;
  currentColumnId: string;
  previousColumnId: string;
  currentIndex: number;
  previousIndex: number;
}

@Component({
  selector: 'app-kanban-board-column',
  templateUrl: './kanban-board-column.component.html',
  styleUrls: ['../kanban-board.scss', './kanban-board-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  @Output() itemAdd: EventEmitter<IKanbanBoardItemAdd> = new EventEmitter();
  @Output() itemMove: EventEmitter<IKanbanBoardItemMove> = new EventEmitter();
  @Output() actionClick: EventEmitter<IKanbanBoardActionClick> = new EventEmitter();
  @Output() movingChange: EventEmitter<boolean> = new EventEmitter();
  public readonly menuIcon = faEllipsisH;
  public hoverStatesDict: Dictionary<boolean> = {};
  public trackByFn = trackByFactory(this.getItemId);

  public onDragItem(): void {
    this.movingChange.emit(true);
  }

  public onDropItem(event: CdkDragDrop<TItem[]>): void {
    const { item, previousIndex, currentIndex, previousContainer, container }: CdkDragDrop<TItem[]> = event;
    if (previousContainer.id === container.id) {
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
    }
    this.itemMove.emit({
      itemId: this.getItemId(item.data.item),
      previousColumnId: item.data.columnId,
      currentColumnId: this.id,
      previousIndex,
      currentIndex
    });
    this.movingChange.emit(false);
  }

  public onActionClick(action: string): void {
    this.actionClick.emit({
      action,
      columnId: this.id
    });
  }

  public onItemAdd(newItemName: string): void {
    this.itemAdd.emit({
      item: newItemName,
      columnId: this.id
    });
  }

}

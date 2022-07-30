import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { IKanbanBoardItemAdd, IKanbanBoardActionClick, IKanbanBoardItemMove } from './kanban-board-column/kanban-board-column.component';
import { trackByFactory } from '@utility/generic/track-by-factory';

export interface KanbanBoard<TColumn, TItem> {
  getColumnId(node: TColumn): string;
  getColumnName(node: TColumn): string;
  getColumnItems(node: TColumn): TItem[];
  getItemId(node: TItem): string;
}

export interface KanbanColumnMove {
  columnId: string;
  currentIndex: number;
  previousIndex: number;
}

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.scss', './kanban-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanBoardComponent<TColumn, TItem> {
  @Input() columns: TColumn[] = [];
  @Input() config: KanbanBoard<TColumn, TItem> = {
    getColumnId: () => '',
    getColumnName: () => '',
    getColumnItems: () => [],
    getItemId: () => '',
  };
  @Input() itemTemplate: TemplateRef<unknown> | undefined;
  @Input() actions: string[] = [];
  @Input() columnUnit = 'Column';
  @Input() itemUnit = 'Item';
  @Output() columnAdd: EventEmitter<string> = new EventEmitter();
  @Output() columnMove: EventEmitter<KanbanColumnMove> = new EventEmitter();
  @Output() itemAdd: EventEmitter<IKanbanBoardItemAdd> = new EventEmitter();
  @Output() itemMove: EventEmitter<IKanbanBoardItemMove> = new EventEmitter();
  @Output() actionClick: EventEmitter<IKanbanBoardActionClick> = new EventEmitter();
  public moving = false;
  public trackByFn = trackByFactory(this.config.getColumnId);

  public onColumnAdd(newColumnName: string): void {
    this.columnAdd.emit(newColumnName);
  }

  public onDragColumn(): void {
    this.moving = true;
  }

  public onDropColumn(event: CdkDragDrop<TColumn[]>): void {
    const { item, previousIndex, currentIndex, container }: CdkDragDrop<TColumn[]> = event;
    moveItemInArray(container.data, previousIndex, currentIndex);
    this.columnMove.emit({
      columnId: item.data,
      currentIndex,
      previousIndex,
    });
    this.moving = false;
  }

  public onItemAdd(event: IKanbanBoardItemAdd): void {
    this.itemAdd.emit(event);
  }

  public onItemMove(event: IKanbanBoardItemMove): void {
    this.itemMove.emit(event);
  }

  public onActionClick(event: IKanbanBoardActionClick): void {
    this.actionClick.emit(event);
  }
}

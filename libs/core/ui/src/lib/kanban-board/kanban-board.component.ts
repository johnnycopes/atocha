/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { trackByFactory } from '../performance/track-by';
import {
  IKanbanBoardItemAdd,
  IKanbanBoardActionClick,
  IKanbanBoardItemMove,
  KanbanBoardColumnComponent,
} from './kanban-board-column/kanban-board-column.component';
import { KanbanBoardFormComponent } from './kanban-board-form/kanban-board-form.component';

export interface KanbanColumnMove {
  columnId: string;
  currentIndex: number;
  previousIndex: number;
}

@Component({
  standalone: true,
  selector: 'core-kanban-board',
  imports: [
    CommonModule,
    DragDropModule,
    KanbanBoardColumnComponent,
    KanbanBoardFormComponent,
  ],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.scss', './kanban-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent<TColumn, TItem> {
  @Input() columns: TColumn[] = [];
  @Input() itemTemplate: TemplateRef<unknown> | undefined;
  @Input() actions: string[] = [];
  @Input() columnUnit = 'Column';
  @Input() itemUnit = 'Item';
  @Input() getColumnId: (node: TColumn) => string = () => '';
  @Input() getColumnName: (node: TColumn) => string = () => '';
  @Input() getColumnItems: (node: TColumn) => TItem[] = () => [];
  @Input() getItemId: (node: TItem) => string = () => '';
  @Output() columnAdd: EventEmitter<string> = new EventEmitter();
  @Output() columnMove: EventEmitter<KanbanColumnMove> = new EventEmitter();
  @Output() itemAdd: EventEmitter<IKanbanBoardItemAdd> = new EventEmitter();
  @Output() itemMove: EventEmitter<IKanbanBoardItemMove> = new EventEmitter();
  @Output() actionClick: EventEmitter<IKanbanBoardActionClick> =
    new EventEmitter();
  moving = false;
  trackByFn = trackByFactory(this.getColumnId);

  onColumnAdd(newColumnName: string): void {
    this.columnAdd.emit(newColumnName);
  }

  onDragColumn(): void {
    this.moving = true;
  }

  onDropColumn(event: CdkDragDrop<TColumn[]>): void {
    const {
      item,
      previousIndex,
      currentIndex,
      container,
    }: CdkDragDrop<TColumn[]> = event;
    moveItemInArray(container.data, previousIndex, currentIndex);
    this.columnMove.emit({
      columnId: item.data,
      currentIndex,
      previousIndex,
    });
    this.moving = false;
  }

  onItemAdd(event: IKanbanBoardItemAdd): void {
    this.itemAdd.emit(event);
  }

  onItemMove(event: IKanbanBoardItemMove): void {
    this.itemMove.emit(event);
  }

  onActionClick(event: IKanbanBoardActionClick): void {
    this.actionClick.emit(event);
  }
}

/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { trackByFactory } from '@atocha/core/ui';
import {
  KanbanBoardItemAdd,
  KanbanBoardItemMove,
  IngredientsBoardColumnComponent,
} from './ingredients-board-column/ingredients-board-column.component';

export interface KanbanColumnMove {
  columnId: string;
  currentIndex: number;
  previousIndex: number;
}

@Component({
  standalone: true,
  selector: 'app-ingredients-board',
  imports: [CommonModule, DragDropModule, IngredientsBoardColumnComponent],
  templateUrl: './ingredients-board.component.html',
  styleUrls: ['./ingredients-board.scss', './ingredients-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'core-kb',
  },
})
export class IngredientsBoardComponent<TColumn, TItem> {
  @Input() columns: TColumn[] = [];
  @Input() itemTemplate: TemplateRef<unknown> | undefined;
  @Input() itemUnit = 'Item';
  @Input() getColumnId: (node: TColumn) => string = () => '';
  @Input() getColumnName: (node: TColumn) => string = () => '';
  @Input() getColumnItems: (node: TColumn) => TItem[] = () => [];
  @Input() getItemId: (node: TItem) => string = () => '';
  @Output() columnMove: EventEmitter<KanbanColumnMove> = new EventEmitter();
  @Output() itemAdd: EventEmitter<KanbanBoardItemAdd> = new EventEmitter();
  @Output() itemMove: EventEmitter<KanbanBoardItemMove> = new EventEmitter();
  moving = false;
  trackByFn = trackByFactory(this.getColumnId);

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

  onItemAdd(event: KanbanBoardItemAdd): void {
    this.itemAdd.emit(event);
  }

  onItemMove(event: KanbanBoardItemMove): void {
    this.itemMove.emit(event);
  }
}

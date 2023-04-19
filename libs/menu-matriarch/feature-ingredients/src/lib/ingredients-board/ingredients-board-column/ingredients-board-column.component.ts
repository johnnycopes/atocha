/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { trackByFactory } from '@atocha/core/ui';
import { IngredientsBoardFormComponent } from './ingredients-board-form/ingredients-board-form.component';

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

export interface KanbanColumnMove {
  columnId: string;
  currentIndex: number;
  previousIndex: number;
}

@Component({
  selector: 'app-ingredients-board-column',
  standalone: true,
  templateUrl: './ingredients-board-column.component.html',
  styleUrls: ['./ingredients-board-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    FontAwesomeModule,
    IngredientsBoardFormComponent,
  ],
})
export class IngredientsBoardColumnComponent<TItem> {
  @Input() id = '';
  @Input() name = '';
  @Input() items: TItem[] = [];
  @Input() itemTemplate: TemplateRef<unknown> | undefined;
  @Input() getItemId: (item: TItem) => string = () => '';
  @Input() moving = false;
  @Output() itemAdd: EventEmitter<KanbanBoardItemAdd> = new EventEmitter();
  @Output() itemMove: EventEmitter<KanbanBoardItemMove> = new EventEmitter();
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

  onItemAdd(newItemName: string): void {
    this.itemAdd.emit({
      item: newItemName,
      columnId: this.id,
    });
  }
}

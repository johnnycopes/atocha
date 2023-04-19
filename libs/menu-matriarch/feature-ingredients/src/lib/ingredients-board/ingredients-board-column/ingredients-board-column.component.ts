/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { IngredientCardComponent } from '../../ingredient-card/ingredient-card.component';
import { IngredientsBoardFormComponent } from './ingredients-board-form/ingredients-board-form.component';
import { Ingredient } from '@atocha/menu-matriarch/util';
import { ingredientTrackByFn } from '@atocha/menu-matriarch/ui-domain';

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
    IngredientCardComponent,
    IngredientsBoardFormComponent,
  ],
})
export class IngredientsBoardColumnComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() items: Ingredient[] = [];
  @Input() moving = false;
  @Output() itemAdd: EventEmitter<KanbanBoardItemAdd> = new EventEmitter();
  @Output() itemMove: EventEmitter<KanbanBoardItemMove> = new EventEmitter();
  @Output() movingChange: EventEmitter<boolean> = new EventEmitter();
  readonly menuIcon = faEllipsisH;
  readonly trackByFn = ingredientTrackByFn;
  hoverStatesDict: Record<string, boolean> = {};

  onDragItem(): void {
    this.movingChange.emit(true);
  }

  onDropItem(event: CdkDragDrop<Ingredient[]>): void {
    const {
      item,
      previousIndex,
      currentIndex,
      previousContainer,
      container,
    }: CdkDragDrop<Ingredient[]> = event;
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
      itemId: item.data.item.name,
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

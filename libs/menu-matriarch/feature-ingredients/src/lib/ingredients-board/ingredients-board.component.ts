/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { trackByFactory } from '@atocha/core/ui';
import { Ingredient, IngredientType } from '@atocha/menu-matriarch/util';
import {
  ItemAdd,
  ItemMove,
  IngredientsBoardColumnComponent,
  ColumnMove,
} from './ingredients-board-column/ingredients-board-column.component';

export interface IngredientColumn {
  name: IngredientType;
  ingredients: Ingredient[];
}

@Component({
  standalone: true,
  selector: 'app-ingredients-board',
  imports: [CommonModule, DragDropModule, IngredientsBoardColumnComponent],
  templateUrl: './ingredients-board.component.html',
  styleUrls: ['./ingredients-board.scss', './ingredients-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsBoardComponent {
  @Input() columns: IngredientColumn[] = [];
  @Output() columnMove = new EventEmitter<ColumnMove>();
  @Output() itemAdd = new EventEmitter<ItemAdd>();
  @Output() itemMove = new EventEmitter<ItemMove>();
  moving = false;
  trackByFn = trackByFactory(({ name: type }: IngredientColumn) => type);

  onDragColumn(): void {
    this.moving = true;
  }

  onDropColumn(event: CdkDragDrop<IngredientColumn[]>): void {
    const {
      item,
      previousIndex,
      currentIndex,
      container,
    }: CdkDragDrop<IngredientColumn[]> = event;

    moveItemInArray(container.data, previousIndex, currentIndex);
    this.columnMove.emit({
      columnId: item.data,
      currentIndex,
      previousIndex,
    });
    this.moving = false;
  }

  onItemAdd(event: ItemAdd): void {
    this.itemAdd.emit(event);
  }

  onItemMove(event: ItemMove): void {
    this.itemMove.emit(event);
  }
}

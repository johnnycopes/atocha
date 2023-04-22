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
  ColumnMove,
  IngredientAdd,
  IngredientMove,
  IngredientsBoardColumnComponent,
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
  @Input() ingredientsByType!: Record<IngredientType, Ingredient[]>;
  @Input() columns: IngredientType[] = [];
  @Output() columnMove = new EventEmitter<ColumnMove>();
  @Output() ingredientAdd = new EventEmitter<IngredientAdd>();
  @Output() ingredientMove = new EventEmitter<IngredientMove>();
  moving = false;
  readonly trackByFn = trackByFactory<IngredientType>((type) => type);

  onDropColumn({
    item,
    previousIndex,
    currentIndex,
    container,
  }: CdkDragDrop<IngredientType[]>): void {
    moveItemInArray(container.data, previousIndex, currentIndex);

    this.columnMove.emit({
      columnId: item.data,
      currentIndex,
      previousIndex,
    });
    this.moving = false;
  }
}

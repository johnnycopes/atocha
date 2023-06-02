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
  IngredientAdd,
  IngredientMove,
  IngredientRename,
  IngredientsBoardColumnComponent,
} from './ingredients-board-column/ingredients-board-column.component';
import { groupIngredientsByType } from './group-ingredients-by-type';

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
  @Input()
  set ingredients(value: Ingredient[]) {
    this.ingredientsByType = groupIngredientsByType(value);
  }
  @Input() columns: IngredientType[] = [];
  @Output() columnMove = new EventEmitter<IngredientType[]>();
  @Output() ingredientAdd = new EventEmitter<IngredientAdd>();
  @Output() ingredientMove = new EventEmitter<IngredientMove>();
  @Output() ingredientRename = new EventEmitter<IngredientRename>();
  @Output() ingredientDelete = new EventEmitter<Ingredient>();
  ingredientsByType = groupIngredientsByType([]);
  readonly trackByFn = trackByFactory<IngredientType>((type) => type);

  onDrop({
    previousIndex,
    currentIndex,
    container,
  }: CdkDragDrop<IngredientType[]>): void {
    moveItemInArray(container.data, previousIndex, currentIndex);
    this.columnMove.emit(container.data);
  }
}

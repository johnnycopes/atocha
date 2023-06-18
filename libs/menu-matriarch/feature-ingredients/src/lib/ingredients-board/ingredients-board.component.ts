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

import { ingredientTypeTrackByFn } from '@atocha/menu-matriarch/ui-domain';
import { Ingredient, IngredientType } from '@atocha/menu-matriarch/util';
import {
  IngredientAdd,
  IngredientMove,
  IngredientRename,
  IngredientsBoardColumnComponent,
} from './ingredients-board-column/ingredients-board-column.component';

export interface ColumnRename {
  column: IngredientType;
  name: string;
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
  @Input() columns: IngredientType[] = [];
  @Output() columnMove = new EventEmitter<string[]>();
  @Output() columnRename = new EventEmitter<ColumnRename>();
  @Output() columnDelete = new EventEmitter<IngredientType>();
  @Output() ingredientAdd = new EventEmitter<IngredientAdd>();
  @Output() ingredientMove = new EventEmitter<IngredientMove>();
  @Output() ingredientRename = new EventEmitter<IngredientRename>();
  @Output() ingredientDelete = new EventEmitter<Ingredient>();
  readonly trackByFn = ingredientTypeTrackByFn;

  async onDrop({ previousIndex, currentIndex }: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, previousIndex, currentIndex);
    this.columnMove.emit(this.columns.map(({ id }) => id));
  }
}

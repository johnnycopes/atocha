import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
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
export class IngredientsBoardComponent implements OnChanges {
  @Input() columns: IngredientType[] = [];
  @Output() columnMove = new EventEmitter<string[]>();
  @Output() columnRename = new EventEmitter<ColumnRename>();
  @Output() ingredientAdd = new EventEmitter<IngredientAdd>();
  @Output() ingredientMove = new EventEmitter<IngredientMove>();
  @Output() ingredientRename = new EventEmitter<IngredientRename>();
  @Output() ingredientDelete = new EventEmitter<Ingredient>();
  columnIds = this._getColumnIds(this.columns);
  readonly trackByFn = ingredientTypeTrackByFn;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']?.currentValue) {
      this.columnIds = this._getColumnIds(this.columns);
    }
  }

  onDrop({
    previousIndex,
    currentIndex,
    container,
  }: CdkDragDrop<string[]>): void {
    moveItemInArray(container.data, previousIndex, currentIndex);
    this.columnMove.emit(container.data);
  }

  private _getColumnIds(columns: IngredientType[]): string[] {
    return columns.map(({ id }) => id);
  }
}

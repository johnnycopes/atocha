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

import { ingredientTypeTrackByFn } from '@atocha/menu-matriarch/shared/ui';
import { Ingredient, IngredientType } from '@atocha/menu-matriarch/shared/util';
import {
  IngredientAdd,
  IngredientMove,
  IngredientRename,
  IngredientsBoardColumnComponent,
} from './ingredients-board-column/ingredients-board-column.component';

export interface TypeRename {
  type: IngredientType;
  name: string;
}

@Component({
  selector: 'app-ingredients-board',
  imports: [CommonModule, DragDropModule, IngredientsBoardColumnComponent],
  templateUrl: './ingredients-board.component.html',
  styleUrls: ['./ingredients-board.scss', './ingredients-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsBoardComponent {
  @Input() types: IngredientType[] = [];
  @Output() typeMove = new EventEmitter<string[]>();
  @Output() typeRename = new EventEmitter<TypeRename>();
  @Output() typeDelete = new EventEmitter<IngredientType>();
  @Output() ingredientAdd = new EventEmitter<IngredientAdd>();
  @Output() ingredientMove = new EventEmitter<IngredientMove>();
  @Output() ingredientRename = new EventEmitter<IngredientRename>();
  @Output() ingredientDelete = new EventEmitter<Ingredient>();
  readonly trackByFn = ingredientTypeTrackByFn;

  async onDrop({ previousIndex, currentIndex }: CdkDragDrop<string[]>) {
    moveItemInArray(this.types, previousIndex, currentIndex);
    this.typeMove.emit(this.types.map(({ id }) => id));
  }
}

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
import { IngredientsBoardFormComponent } from './ingredients-board-form.component';
import { Ingredient } from '@atocha/menu-matriarch/util';
import { ingredientTrackByFn } from '@atocha/menu-matriarch/ui-domain';

export interface ColumnMove {
  columnName: string;
  currentIndex: number;
  previousIndex: number;
}

export interface IngredientAdd {
  ingredientName: string;
  columnName: string;
}

export interface IngredientMove {
  ingredientId: string;
  currentColumnName: string;
  previousColumnName: string;
  currentIndex: number;
  previousIndex: number;
}

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-ingredients-board-column]',
  templateUrl: './ingredients-board-column.component.html',
  styleUrls: [
    '../ingredients-board.scss',
    './ingredients-board-column.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DragDropModule,
    FontAwesomeModule,
    IngredientsBoardFormComponent,
    IngredientCardComponent,
  ],
})
export class IngredientsBoardColumnComponent {
  @Input() name = '';
  @Input() ingredients: Ingredient[] = [];
  @Input() moving = false;
  @Output() add = new EventEmitter<IngredientAdd>();
  @Output() move = new EventEmitter<IngredientMove>();
  @Output() movingChange = new EventEmitter<boolean>();
  readonly menuIcon = faEllipsisH;
  readonly trackByFn = ingredientTrackByFn;

  onDropItem({
    item,
    previousIndex,
    currentIndex,
    previousContainer,
    container,
  }: CdkDragDrop<Ingredient[]>): void {
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
    this.move.emit({
      ingredientId: item.data.item.name,
      previousColumnName: item.data.columnId,
      currentColumnName: this.name,
      previousIndex,
      currentIndex,
    });
    this.movingChange.emit(false);
  }

  onItemAdd(ingredientName: string): void {
    this.add.emit({
      ingredientName,
      columnName: this.name,
    });
  }
}

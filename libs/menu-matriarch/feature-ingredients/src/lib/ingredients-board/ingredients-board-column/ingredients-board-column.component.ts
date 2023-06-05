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
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { IngredientCardComponent } from '../../ingredient-card/ingredient-card.component';
import { IngredientsBoardFormComponent } from './ingredients-board-form.component';
import { ingredientTrackByFn } from '@atocha/menu-matriarch/ui-domain';
import { Ingredient } from '@atocha/menu-matriarch/util';
import {
  OptionsMenuComponent,
  OptionsMenuItemComponent,
  OptionsMenuTriggerDirective,
} from '@atocha/menu-matriarch/ui-generic';
import { ButtonComponent } from '@atocha/core/ui';

export interface IngredientAdd {
  ingredientName: string;
  columnId: string;
}

export interface IngredientMove {
  ingredient: Ingredient;
  columnId: string;
}

export interface IngredientRename {
  ingredient: Ingredient;
  name: string;
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
    ButtonComponent,
    CommonModule,
    DragDropModule,
    FontAwesomeModule,
    IngredientsBoardFormComponent,
    IngredientCardComponent,
    OptionsMenuComponent,
    OptionsMenuItemComponent,
    OptionsMenuTriggerDirective,
  ],
})
export class IngredientsBoardColumnComponent {
  @Input() name = '';
  @Input() ingredients: Ingredient[] = [];
  @Output() add = new EventEmitter<IngredientAdd>();
  @Output() move = new EventEmitter<IngredientMove>();
  @Output() rename = new EventEmitter<IngredientRename>();
  @Output() delete = new EventEmitter<Ingredient>();
  readonly menuToggleIcon = faEllipsisV;
  readonly trackByFn = ingredientTrackByFn;

  onDrop({
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
      ingredient: item.data.ingredient,
      columnId: this.name,
    });
  }
}

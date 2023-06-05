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
import { BehaviorSubject } from 'rxjs';

import { ButtonComponent } from '@atocha/core/ui';
import { Ingredient } from '@atocha/menu-matriarch/util';
import {
  InlineNameEditComponent,
  ingredientTrackByFn,
} from '@atocha/menu-matriarch/ui-domain';
import {
  OptionsMenuComponent,
  OptionsMenuItemComponent,
  OptionsMenuTriggerDirective,
} from '@atocha/menu-matriarch/ui-generic';
import { IngredientCardComponent } from '../../ingredient-card/ingredient-card.component';
import { IngredientsBoardFormComponent } from './ingredients-board-form.component';

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

type State = 'default' | 'renaming' | 'addingIngredient';

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
    InlineNameEditComponent,
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

  private _stateSubject = new BehaviorSubject<State>('default');
  state$ = this._stateSubject.asObservable();

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

  onAddNewIngredient(): void {
    this._stateSubject.next('addingIngredient');
  }

  onRename(): void {
    this._stateSubject.next('renaming');
  }

  onCancel(): void {
    this._stateSubject.next('default');
  }

  onSave(name: string, state: State): void {
    if (state === 'renaming') {
      console.log('rename');
    } else if (state === 'addingIngredient') {
      this.add.emit({ ingredientName: name, columnId: this.name });
    }
  }

  addNewIngredient(name: string): void {
    this.add.emit({ ingredientName: name, columnId: this.name });
    this._stateSubject.next('default');
  }
}

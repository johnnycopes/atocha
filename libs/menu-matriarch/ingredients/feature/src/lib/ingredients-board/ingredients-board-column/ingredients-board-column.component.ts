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
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

import { ButtonComponent } from '@atocha/core/ui';
import { Ingredient } from '@atocha/menu-matriarch/shared/util';
import {
  InlineNameEditComponent,
  ingredientTrackByFn,
} from '@atocha/menu-matriarch/shared/ui-domain';
import {
  OptionsMenuComponent,
  OptionsMenuItemComponent,
  OptionsMenuTriggerDirective,
} from '@atocha/menu-matriarch/shared/ui-generic';
import { IngredientCardComponent } from '../../ingredient-card/ingredient-card.component';

export interface IngredientAdd {
  name: string;
  typeId: string;
}

export interface IngredientMove {
  ingredient: Ingredient;
  typeId: string;
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
    IngredientCardComponent,
    InlineNameEditComponent,
    OptionsMenuComponent,
    OptionsMenuItemComponent,
    OptionsMenuTriggerDirective,
  ],
})
export class IngredientsBoardColumnComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() ingredients: Ingredient[] = [];
  @Output() rename = new EventEmitter<string>();
  @Output() delete = new EventEmitter<void>();
  @Output() ingredientAdd = new EventEmitter<IngredientAdd>();
  @Output() ingredientMove = new EventEmitter<IngredientMove>();
  @Output() ingredientRename = new EventEmitter<IngredientRename>();
  @Output() ingredientDelete = new EventEmitter<Ingredient>();

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
      return;
    }
    transferArrayItem(
      previousContainer.data,
      container.data,
      previousIndex,
      currentIndex
    );
    this.ingredientMove.emit({
      ingredient: item.data,
      typeId: this.id,
    });
  }

  onCancel(): void {
    this._stateSubject.next('default');
  }

  onRename(): void {
    this._stateSubject.next('renaming');
  }

  onRenameSave(name: string): void {
    this.rename.emit(name);
    this._stateSubject.next('default');
  }

  onAddNewIngredient(): void {
    this._stateSubject.next('addingIngredient');
  }

  onAddIngredientSave(name: string): void {
    this.ingredientAdd.emit({ name: name, typeId: this.id });
    this._stateSubject.next('default');
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable, map } from 'rxjs';

import {
  IngredientService,
  UserService,
} from '@atocha/menu-matriarch/data-access';
import { SectionComponent } from '@atocha/menu-matriarch/ui-generic';
import {
  IngredientColumn,
  IngredientsBoardComponent,
} from './ingredients-board/ingredients-board.component';
import { createIngredientsColumns } from './create-ingredients-columns';
import {
  ColumnMove,
  IngredientAdd,
  IngredientMove,
} from './ingredients-board/ingredients-board-column/ingredients-board-column.component';

@Component({
  standalone: true,
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IngredientsBoardComponent, SectionComponent],
})
export class IngredientsComponent {
  vm$: Observable<{
    total: number;
    columns: IngredientColumn[];
  }> = combineLatest([
    this._ingredientService.getIngredients(),
    this._userService
      .getPreferences()
      .pipe(map((preferences) => preferences?.ingredientTypeOrder)),
  ]).pipe(
    map(([ingredients, order]) => ({
      total: ingredients.length,
      columns: order ? createIngredientsColumns(ingredients, order) : [],
    }))
  );

  constructor(
    private _ingredientService: IngredientService,
    private _userService: UserService
  ) {}

  onColumnMove(e: ColumnMove) {
    console.log(e);
  }

  onIngredientAdd(e: IngredientAdd) {
    console.log(e);
  }

  onIngredientMove(e: IngredientMove) {
    console.log(e);
  }
}

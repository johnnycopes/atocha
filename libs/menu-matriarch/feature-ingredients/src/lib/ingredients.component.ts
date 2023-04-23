import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import {
  IngredientService,
  UserService,
} from '@atocha/menu-matriarch/data-access';
import { SectionComponent } from '@atocha/menu-matriarch/ui-generic';
import { IngredientType } from '@atocha/menu-matriarch/util';
import { IngredientsBoardComponent } from './ingredients-board/ingredients-board.component';
import {
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
  vm$ = combineLatest([
    this._ingredientService.getIngredients(),
    this._userService
      .getPreferences()
      .pipe(map((preferences) => preferences?.ingredientTypeOrder)),
  ]).pipe(
    map(([ingredients, order]) => ({
      ingredients,
      columns:
        order ??
        ([
          'bread/bakery',
          'canned/jarred good',
          'condiment',
          'dry good',
          'frozen',
          'grocery',
          'meat/seafood',
          'oil',
          'produce',
          'refrigerated',
          'spice',
          'uncategorized',
        ] as IngredientType[]),
    }))
  );

  constructor(
    private _ingredientService: IngredientService,
    private _userService: UserService
  ) {}

  onColumnMove(columns: IngredientType[]) {
    this._userService
      .updatePreferences({ ingredientTypeOrder: columns })
      .subscribe();
  }

  onIngredientAdd({ ingredientName, columnId }: IngredientAdd) {
    this._ingredientService
      .createIngredient({
        name: ingredientName,
        type: columnId as IngredientType,
        dishIds: [],
      })
      .subscribe();
  }

  onIngredientMove({ ingredient, columnId }: IngredientMove) {
    this._ingredientService.updateIngredient(ingredient, {
      ...ingredient,
      type: columnId as IngredientType,
    });
  }
}

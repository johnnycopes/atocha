import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import {
  IngredientService,
  UserService,
} from '@atocha/menu-matriarch/data-access';
import { SectionComponent } from '@atocha/menu-matriarch/ui-generic';
import { IngredientType } from '@atocha/menu-matriarch/util';
import {
  ColumnMove,
  IngredientsBoardComponent,
} from './ingredients-board/ingredients-board.component';
import {
  IngredientAdd,
  IngredientMove,
} from './ingredients-board/ingredients-board-column/ingredients-board-column.component';
import { groupIngredientsByType } from './group-ingredients-by-type';

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
      total: ingredients.length,
      ingredientsByType: groupIngredientsByType(ingredients),
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

  onColumnMove(e: ColumnMove) {
    console.log(e);
  }

  onIngredientAdd({ ingredientName, columnId }: IngredientAdd) {
    this._ingredientService
      .createIngredient({
        name: ingredientName,
        type: this._mapColumnIdToIngredientType(columnId),
        dishIds: [],
      })
      .subscribe();
  }

  onIngredientMove({ ingredient, currentColumnId }: IngredientMove) {
    // this._ingredientService.updateIngredient(ingredient, {
    //   ...ingredient,
    //   type: this._mapColumnIdToIngredientType(currentColumnId),
    // });
  }

  private _mapColumnIdToIngredientType(columnId: string): IngredientType {
    return columnId as IngredientType;
  }
}

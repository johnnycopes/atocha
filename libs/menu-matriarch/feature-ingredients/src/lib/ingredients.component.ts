import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, tap } from 'rxjs';

import {
  IngredientService,
  IngredientTypeService,
  UserService,
} from '@atocha/menu-matriarch/data-access';
import { SectionComponent } from '@atocha/menu-matriarch/ui-generic';
import { Ingredient, IngredientType } from '@atocha/menu-matriarch/util';
import { IngredientsBoardComponent } from './ingredients-board/ingredients-board.component';
import {
  IngredientAdd,
  IngredientMove,
  IngredientRename,
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
    this._ingredientTypeService.getIngredientTypes(),
    this._userService
      .getPreferences()
      .pipe(map((preferences) => preferences?.ingredientTypeOrder ?? [])),
  ]).pipe(
    map(([ingredientTypes, columnIds]) => {
      const ingredientTypesKeyedById = ingredientTypes.reduce<
        Record<string, IngredientType>
      >((record, type) => {
        record[type.id] = type;
        return record;
      }, {});

      return {
        total: ingredientTypes.reduce(
          (total, { ingredients }) => total + ingredients.length,
          0
        ),
        columns: columnIds.map((column) => ingredientTypesKeyedById[column]),
      };
    })
  );

  constructor(
    private _ingredientService: IngredientService,
    private _ingredientTypeService: IngredientTypeService,
    private _userService: UserService
  ) {}

  onColumnMove(columns: string[]) {
    this._userService
      .updatePreferences({ ingredientTypeOrder: columns })
      .subscribe();
  }

  onIngredientAdd({ ingredientName, columnId }: IngredientAdd) {
    this._ingredientService
      .createIngredient({
        name: ingredientName,
        typeId: columnId,
        dishIds: [],
      })
      .subscribe();
  }

  onIngredientMove({ ingredient, columnId }: IngredientMove) {
    this._ingredientService.updateIngredient(ingredient, {
      ...ingredient,
      typeId: columnId,
    });
  }

  onIngredientRename({ ingredient, name }: IngredientRename): void {
    this._ingredientService.updateIngredient(ingredient, {
      ...ingredient,
      name,
    });
  }

  onIngredientDelete(ingredient: Ingredient): void {
    this._ingredientService.deleteIngredient(ingredient);
  }
}

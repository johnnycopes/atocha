import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, map, withLatestFrom } from 'rxjs';

import {
  IngredientService,
  UserService,
} from '@atocha/menu-matriarch/data-access';
import { SectionComponent } from '@atocha/menu-matriarch/ui-generic';
import {
  IngredientColumn,
  IngredientsBoardComponent,
} from './ingredients-board/ingredients-board.component';
import { createOrderedIngredientsColumns } from './create-ordered-ingredients-columns';
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
  vm$: Observable<{
    total: number;
    columns: IngredientColumn[];
  }> = this._ingredientService.getIngredients().pipe(
    withLatestFrom(
      this._userService
        .getPreferences()
        .pipe(map((preferences) => preferences?.ingredientTypeOrder))
    ),
    map(([ingredients, ingredientTypeOrder]) => {
      if (!ingredientTypeOrder) {
        return { total: 0, columns: [] };
      }
      const columns = createOrderedIngredientsColumns(ingredientTypeOrder);
      const ingredientsGroupedByType = groupIngredientsByType(ingredients);
      columns.forEach(
        (column) => (column.ingredients = ingredientsGroupedByType[column.name])
      );

      return {
        total: ingredients.length,
        columns,
      };
    })
  );

  constructor(
    private _ingredientService: IngredientService,
    private _userService: UserService
  ) {}

  onColumnMove(e: unknown) {
    console.log(e);
  }

  onItemAdd(e: unknown) {
    console.log(e);
  }

  onItemMove(e: unknown) {
    console.log(e);
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { IngredientService } from '@atocha/menu-matriarch/data-access';
import { ingredientTrackByFn } from '@atocha/menu-matriarch/ui-domain';
import { SectionComponent } from '@atocha/menu-matriarch/ui-generic';
import { IngredientsBoardComponent } from './ingredients-board/ingredients-board.component';
import { groupIngredientsByType } from './group-ingredients-by-type';
import { Ingredient, IngredientType } from '@atocha/menu-matriarch/util';

interface IngredientCategory {
  type: IngredientType;
  ingredients: Ingredient[];
}

@Component({
  standalone: true,
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IngredientsBoardComponent, SectionComponent],
})
export class IngredientsComponent {
  ingredients$ = this._ingredientService.getIngredients();

  columns$: Observable<IngredientCategory[]> = this.ingredients$.pipe(
    map((ingredients) =>
      Object.entries(groupIngredientsByType(ingredients)).map(
        ([type, ingredients]) => ({
          type,
          ingredients,
        })
      )
    ),
    tap(console.log)
  );

  trackByFn = ingredientTrackByFn;

  constructor(private _ingredientService: IngredientService) {}

  getColumnId = ({ type }: IngredientCategory): string => type;
  getColumnName = ({ type }: IngredientCategory): string => type;
  getColumnItems = ({ ingredients }: IngredientCategory): Ingredient[] =>
    ingredients;
  getItemId = ({ name }: Ingredient): string => name;

  onColumnMove(e: unknown) {
    console.log(e);
  }

  onItemAdd(e: unknown) {
    console.log(e);
  }

  onItemMove(e: unknown) {
    console.log(e);
  }

  actionClick(e: unknown) {
    console.log(e);
  }
}

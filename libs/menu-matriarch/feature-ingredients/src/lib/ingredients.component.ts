import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, map } from 'rxjs';

import { IngredientService } from '@atocha/menu-matriarch/data-access';
import { SectionComponent } from '@atocha/menu-matriarch/ui-generic';
import { IngredientType } from '@atocha/menu-matriarch/util';
import {
  IngredientColumn,
  IngredientsBoardComponent,
} from './ingredients-board/ingredients-board.component';
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
    map((ingredients) => ({
      total: ingredients.length,
      columns: Object.entries(groupIngredientsByType(ingredients)).map(
        ([type, ingredients]) => ({
          name: type as IngredientType,
          ingredients,
        })
      ),
    }))
  );

  constructor(private _ingredientService: IngredientService) {}

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

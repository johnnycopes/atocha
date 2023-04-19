import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IngredientService } from '@atocha/menu-matriarch/data-access';
import { ingredientTrackByFn } from '@atocha/menu-matriarch/ui-domain';
import { SectionComponent } from '@atocha/menu-matriarch/ui-generic';
import { IngredientsBoardComponent } from './ingredients-board/ingredients-board.component';

export interface KitchenLocation {
  id: string;
  name: string;
  foods: string[];
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
  trackByFn = ingredientTrackByFn;

  columns: KitchenLocation[] = [
    {
      id: '01',
      name: 'Refrigerator',
      foods: ['Salmon', 'Cheese', 'Oat milk', 'Mustard'],
    },
    {
      id: '02',
      name: 'Freezer',
      foods: ['Chicken', 'Mixed veggies'],
    },
    {
      id: '03',
      name: 'Pantry',
      foods: [
        'Avocados',
        'Tomatoes',
        'Bell peppers',
        'Red onions',
        'Sweet pototoes',
      ],
    },
  ];

  constructor(private _ingredientService: IngredientService) {}

  getColumnId = ({ id }: KitchenLocation): string => id;
  getColumnName = ({ name }: KitchenLocation): string => name;
  getColumnItems = ({ foods }: KitchenLocation): string[] => foods;
  getItemId = (food: string): string => food;

  onColumnAdd(e: unknown) {
    console.log(e);
  }

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

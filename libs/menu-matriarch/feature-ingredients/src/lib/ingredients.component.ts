import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { IngredientService } from '@atocha/menu-matriarch/data-access';

@Component({
  standalone: true,
  selector: 'app-ingredients',
  imports: [CommonModule],
  template: `{{ ingredients$ | async | json }}`,
})
export class IngredientsComponent {
  ingredients$ = this._ingredientService.getIngredients();

  constructor(private _ingredientService: IngredientService) {}
}

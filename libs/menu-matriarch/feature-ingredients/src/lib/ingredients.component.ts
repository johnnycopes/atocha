import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IngredientService } from '@atocha/menu-matriarch/data-access';
import { SectionComponent } from '@atocha/menu-matriarch/ui-generic';

@Component({
  standalone: true,
  selector: 'app-ingredients',
  imports: [CommonModule, SectionComponent],
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsComponent {
  ingredients$ = this._ingredientService.getIngredients();

  constructor(private _ingredientService: IngredientService) {}
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IngredientService } from '@atocha/menu-matriarch/data-access';
import { ingredientTrackByFn } from '@atocha/menu-matriarch/ui-domain';
import { SectionComponent } from '@atocha/menu-matriarch/ui-generic';
import { IngredientCardComponent } from './ingredient-card/ingredient-card.component';

@Component({
  standalone: true,
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IngredientCardComponent, SectionComponent],
})
export class IngredientsComponent {
  ingredients$ = this._ingredientService.getIngredients();
  trackByFn = ingredientTrackByFn;

  constructor(private _ingredientService: IngredientService) {}
}

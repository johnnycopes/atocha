import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountComponent } from '@atocha/menu-matriarch/ui-domain';
import { CardComponent } from '@atocha/menu-matriarch/ui-generic';
import { IngredientType } from '@atocha/menu-matriarch/util';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-ingredient-card]',
  imports: [CardComponent, CommonModule, CountComponent],
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientCardComponent {
  @Input() name = '';
  @Input() type: IngredientType = 'uncategorized';
  @Input() dishes: string[] = [];
}

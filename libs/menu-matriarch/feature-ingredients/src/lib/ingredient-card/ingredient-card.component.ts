import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from '@atocha/menu-matriarch/ui-generic';
import { IngredientType } from '@atocha/menu-matriarch/util';

@Component({
  selector: 'app-ingredient-card',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientCardComponent {
  @Input() name = '';
  @Input() type: IngredientType = 'uncategorized';
  @Input() dishIds: string[] = [];
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DishSummaryComponent } from '@atocha/menu-matriarch/ui-domain';
import { CardComponent } from '@atocha/menu-matriarch/ui-generic';
import { Tag, DishType } from '@atocha/menu-matriarch/shared/util';

@Component({
  standalone: true,
  selector: 'app-dish-card',
  imports: [CardComponent, DishSummaryComponent],
  templateUrl: './dish-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishCardComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() description = '';
  @Input() link = '';
  @Input() type: DishType = 'main';
  @Input() favorited = false;
  @Input() tags: Tag[] = [];
  @Input() menuIds: string[] = [];
  @Input() mealIds: string[] = [];
  @Input() usages = 0;
  @Input() active = false;
}

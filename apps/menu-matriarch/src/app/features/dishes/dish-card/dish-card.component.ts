import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Tag, DishType } from '@atocha/menu-matriarch/types';

@Component({
  selector: 'app-dish-card',
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
  @Input() ingredients: string[] = [];
  @Input() tags: Tag[] = [];
  @Input() menuIds: string[] = [];
  @Input() mealIds: string[] = [];
  @Input() usages = 0;
  @Input() active = false;
}

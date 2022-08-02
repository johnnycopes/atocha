import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  Dish,
  FilteredDishesGroup,
  Orientation,
  getDishTypes,
} from '@atocha/menu-matriarch/types';
import { dishTrackByFn, groupTrackByFn } from '@atocha/menu-matriarch/ui';

@Component({
  selector: 'app-meal-summary',
  templateUrl: './meal-summary.component.html',
  styleUrls: ['./meal-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealSummaryComponent {
  @Input()
  set dishes(dishes: Dish[]) {
    this.dishesGroups = getDishTypes().map((type) => ({
      type,
      dishes: dishes.filter((dish) => dish.type === type),
    }));
    this.showFallback = !dishes.length;
  }
  @Input() boundaries: 'labeled' | 'unlabeled' = 'unlabeled';
  @Input() fallbackText = '';
  @Input() orientation: Orientation = 'horizontal';
  public dishesGroups: FilteredDishesGroup[] = [];
  public showFallback = true;
  public readonly groupTrackByFn = groupTrackByFn;
  public readonly dishTrackByFn = dishTrackByFn;
}

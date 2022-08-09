import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  Dish,
  FilteredDishesGroup,
  Orientation,
  getDishTypes,
} from '@atocha/menu-matriarch/types';
import { dishTrackByFn, groupTrackByFn } from '../track-by-functions';

@Component({
  selector: 'ui-meal-summary',
  templateUrl: './meal-summary.component.html',
  styleUrls: ['./meal-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealSummaryComponent {
  @Input()
  set dishes(dishes: Dish[]) {
    this.dishesGroups = getDishTypes().map((dishType) => ({
      type: dishType,
      dishes: dishes.filter(({ type }) => type === dishType),
    }));
    this.showFallback = !dishes.length;
  }
  @Input() boundaries: 'labeled' | 'unlabeled' = 'unlabeled';
  @Input() fallbackText = '';
  @Input() orientation: Orientation = 'horizontal';
  @Output() dishClick = new EventEmitter<string>();

  dishesGroups: FilteredDishesGroup[] = [];
  showFallback = true;
  readonly groupTrackByFn = groupTrackByFn;
  readonly dishTrackByFn = dishTrackByFn;
}

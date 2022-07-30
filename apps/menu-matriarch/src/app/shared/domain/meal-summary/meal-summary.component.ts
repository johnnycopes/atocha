import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Dish } from '@models/dish.interface';
import { FilteredDishesGroup } from '@models/filtered-dishes.interface';
import { Orientation } from '@models/orientation.type';
import { getDishTypes } from '@utility/domain/get-dish-types';
import { trackByDishType, trackById } from '@utility/domain/track-by-functions';

@Component({
  selector: 'app-meal-summary',
  templateUrl: './meal-summary.component.html',
  styleUrls: ['./meal-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealSummaryComponent {
  @Input()
  set dishes(dishes: Dish[]) {
    this.dishesGroups = getDishTypes().map(type => ({
      type,
      dishes: dishes.filter(dish => dish.type === type),
    }));
    this.showFallback = !dishes.length;
  }
  @Input() boundaries: 'labeled' | 'unlabeled' = 'unlabeled';
  @Input() fallbackText = '';
  @Input() orientation: Orientation = 'horizontal';
  public dishesGroups: FilteredDishesGroup[] = [];
  public showFallback = true;
  public readonly groupTrackByFn = trackByDishType;
  public readonly dishTrackByFn = trackById;
}

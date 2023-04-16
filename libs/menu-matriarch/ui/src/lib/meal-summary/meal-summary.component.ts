import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  Dish,
  FilteredDishesGroup,
  Orientation,
  getDishTypes,
} from '@atocha/menu-matriarch/util';
import { SmallCapsLabelComponent } from '@atocha/menu-matriarch/ui-generic';
import { dishTrackByFn, groupTrackByFn } from '../track-by-functions';

@Component({
  standalone: true,
  selector: 'ui-meal-summary',
  imports: [CommonModule, RouterLink, SmallCapsLabelComponent],
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

  dishesGroups: FilteredDishesGroup[] = [];
  showFallback = true;
  readonly groupTrackByFn = groupTrackByFn;
  readonly dishTrackByFn = dishTrackByFn;
}

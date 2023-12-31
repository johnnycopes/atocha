import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  dishTrackByFn,
  groupTrackByFn,
} from '@atocha/menu-matriarch/shared/ui-domain';
import { SmallCapsLabelComponent } from '@atocha/menu-matriarch/shared/ui';
import {
  Dish,
  FilteredDishesGroup,
  Orientation,
  getDishTypes,
} from '@atocha/menu-matriarch/shared/util';

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

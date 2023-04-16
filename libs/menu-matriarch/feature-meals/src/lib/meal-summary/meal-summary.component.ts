import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SmallCapsLabelComponent, dishTrackByFn, groupTrackByFn } from '@atocha/menu-matriarch/ui';

import {
  Dish,
  FilteredDishesGroup,
  Orientation,
  getDishTypes,
} from '@atocha/menu-matriarch/util';

@Component({
  standalone: true,
  selector: 'app-meal-summary',
  imports: [CommonModule, SmallCapsLabelComponent],
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

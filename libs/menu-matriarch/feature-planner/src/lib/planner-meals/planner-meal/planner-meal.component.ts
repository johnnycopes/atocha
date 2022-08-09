import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

import { trackByFactory } from '@atocha/core/ui';
import {
  Day,
  Dish,
  Menu,
  Orientation,
  Tag,
} from '@atocha/menu-matriarch/types';

interface EntryModel {
  day: Day;
  dishIds: string[];
  checked: boolean;
  indeterminate: boolean;
}

@Component({
  selector: 'app-planner-meal',
  templateUrl: './planner-meal.component.html',
  styleUrls: ['./planner-meal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerMealComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() description = '';
  @Input() dishes: Dish[] = [];
  @Input() tags: Tag[] = [];
  @Input() fallbackText = '';
  @Input() orientation: Orientation = 'horizontal';
  @Input()
  set menu(menu: Menu | undefined) {
    this.entryModels =
      menu?.entries.map((entry) => {
        const mealDishIds = this.dishes.map((dish) => dish.id);
        const entryDishIds = entry.dishes.map((dish) => dish.id);
        const { checked, indeterminate } = this._compare(
          mealDishIds,
          entryDishIds
        );
        return {
          day: entry.day,
          dishIds: indeterminate
            ? mealDishIds.filter((id) => !entryDishIds.includes(id))
            : mealDishIds,
          checked,
          indeterminate,
        };
      }) ?? [];
  }
  @Output() dayChange = new EventEmitter<{
    dishIds: string[];
    day: Day;
    selected: boolean;
  }>();
  entryModels: EntryModel[] = [];
  readonly trackByFn = trackByFactory<EntryModel>(({ day }) => day);

  constructor(private _router: Router) {}

  onDishClick(id: string): void {
    this._router.navigate(['dishes', id]);
  }

  private _compare(
    mealDishIds: string[],
    entryDishIds: string[]
  ): { checked: boolean; indeterminate: boolean } {
    if (entryDishIds.length === 0) {
      return { checked: false, indeterminate: false };
    }
    let matches = 0;
    for (const mealDishId of mealDishIds) {
      if (entryDishIds.includes(mealDishId)) {
        matches++;
      }
    }
    return {
      checked: matches === mealDishIds.length,
      indeterminate: matches > 0 && matches < mealDishIds.length,
    };
  }
}

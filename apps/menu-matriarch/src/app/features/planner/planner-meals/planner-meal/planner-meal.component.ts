import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Day } from '@models/day.type';

import { Dish } from '@models/dish.interface';
import { Menu } from '@models/menu.interface';
import { Orientation } from '@models/orientation.type';
import { Tag } from '@models/tag.interface';
import { trackByDay } from '@utility/domain/track-by-functions';

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
  changeDetection: ChangeDetectionStrategy.OnPush
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
  public set menu(menu: Menu | undefined) {
    this.entryModels = menu?.entries.map(entry => {
      const mealDishIds = this.dishes.map(dish => dish.id);
      const entryDishIds = entry.dishes.map(dish => dish.id);
      const { checked, indeterminate } = this._compare(mealDishIds, entryDishIds);
      return {
        day: entry.day,
        dishIds: indeterminate
          ? mealDishIds.filter(id => !entryDishIds.includes(id))
          : mealDishIds
        ,
        checked,
        indeterminate,
      };
    }) ?? [];
  }
  @Output() dayChange = new EventEmitter<{ dishIds: string[], day: Day, selected: boolean }>();
  public entryModels: EntryModel[] = [];
  public readonly trackByFn = trackByDay;

  private _compare(
    mealDishIds: string[],
    entryDishIds: string[],
  ): { checked: boolean, indeterminate: boolean } {
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

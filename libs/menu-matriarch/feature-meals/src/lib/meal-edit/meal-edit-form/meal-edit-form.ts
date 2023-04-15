import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AppData } from './meal-edit-form.component';
import { map, of, startWith } from 'rxjs';
import { Dish } from '@atocha/menu-matriarch/util';

export interface MealEditForm {
  name: FormControl<string>;
  description: FormControl<string>;
  dishIds: FormGroup<Record<string, FormControl<boolean>>>;
  tagIds: FormGroup<Record<string, FormControl<boolean>>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: AbstractControl<any, any>;
}

export class MealEditFormClass extends FormGroup<MealEditForm> {
  dishes$ =
    this.get('dishIds')?.valueChanges.pipe(
      startWith(this._mapDishesToFormRecord(this.details.meal.dishes)),
      map((dishIds) =>
        this._mapFormRecordToDishes(this.details.allDishes, dishIds)
      )
    ) ?? of([]);

  constructor(
    readonly details: AppData,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.nonNullable.group<MealEditForm>({
        name: fb.nonNullable.control(details.meal.name, Validators.required),
        description: fb.nonNullable.control(details.meal.description),
        dishIds: fb.nonNullable.group(
          details.allDishes.reduce((group, { id }) => {
            group[id] = fb.nonNullable.control(
              details.meal.dishes.map(({ id }) => id).includes(id)
            );
            return group;
          }, {} as { [key: string]: FormControl<boolean> })
        ),
        tagIds: fb.nonNullable.group(
          details.allTags.reduce((group, { id }) => {
            group[id] = fb.nonNullable.control(
              details.meal.tags.map(({ id }) => id).includes(id)
            );
            return group;
          }, {} as { [key: string]: FormControl<boolean> })
        ),
      }).controls,
      []
    );
  }

  private _mapDishesToFormRecord(dishes: Dish[]): Record<string, boolean> {
    const record: Record<string, boolean> = {};

    for (const dish of dishes) {
      record[dish.id] = true;
    }

    return record;
  }

  private _mapFormRecordToDishes(
    allDishes: Dish[],
    formDishes: Partial<Record<string, boolean>>
  ): Dish[] {
    const dishes: Dish[] = [];

    for (const dishId in formDishes) {
      if (formDishes[dishId]) {
        const dish = allDishes.find(({ id }) => id === dishId);
        if (dish) {
          dishes.push(dish);
        }
      }
    }

    return dishes;
  }
}

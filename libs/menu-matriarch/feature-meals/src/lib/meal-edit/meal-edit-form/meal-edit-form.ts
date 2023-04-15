import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, of, startWith } from 'rxjs';

import { Dish } from '@atocha/menu-matriarch/util';
import { MealConfig } from './meal-edit-form.component';

export class MealEditForm extends FormGroup<{
  name: FormControl<string>;
  description: FormControl<string>;
  dishesModel: FormGroup<Record<string, FormControl<boolean>>>;
  tagsModel: FormGroup<Record<string, FormControl<boolean>>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: AbstractControl<any, any>;
}> {
  dishes$ = of<Dish[]>([]);
  // dishes$ =
  //   this.get('dishIds')?.valueChanges.pipe(
  //     startWith(this._mapDishesToFormRecord(this.details.meal.dishes)),
  //     map((dishIds) =>
  //       this._mapFormRecordToDishes(this.details.allDishes, dishIds)
  //     )
  //   ) ?? of([]);

  constructor(
    readonly meal: MealConfig,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.nonNullable.group({
        name: fb.nonNullable.control(meal.name, Validators.required),
        description: fb.nonNullable.control(meal.description),
        dishesModel: fb.nonNullable.group(
          meal.dishesModel.reduce<Record<string, FormControl<boolean>>>(
            (group, dish) => {
              group[dish.id] = fb.nonNullable.control(dish.checked);
              return group;
            },
            {}
          )
        ),
        tagsModel: fb.nonNullable.group(
          meal.tagsModel.reduce<Record<string, FormControl<boolean>>>(
            (group, tag) => {
              group[tag.id] = fb.nonNullable.control(tag.checked);
              return group;
            },
            {}
          )
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

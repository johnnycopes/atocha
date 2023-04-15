import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, of, startWith } from 'rxjs';

import { DishModel } from '@atocha/menu-matriarch/util';
import { MealConfig } from './meal-edit-form.component';

export class MealEditForm extends FormGroup<{
  name: FormControl<string>;
  description: FormControl<string>;
  dishesModel: FormGroup<Record<string, FormControl<boolean>>>;
  tagsModel: FormGroup<Record<string, FormControl<boolean>>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: AbstractControl<any, any>;
}> {
  dishes$ =
    this.get('dishesModel')?.valueChanges.pipe(
      startWith(this._mapDishesModelToFormRecord(this.meal.dishesModel)),
      map((dishIds) =>
        this._mapFormRecordToDishes(this.meal.dishesModel, dishIds)
      )
    ) ?? of([]);

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

  private _mapDishesModelToFormRecord(
    dishesModel: DishModel[]
  ): Record<string, boolean> {
    const record: Record<string, boolean> = {};

    for (const { id, checked } of dishesModel) {
      record[id] = checked;
    }

    return record;
  }

  private _mapFormRecordToDishes(
    dishesModel: DishModel[],
    record: Partial<Record<string, boolean>>
  ): DishModel[] {
    const dishes: DishModel[] = [];

    for (const dishId in record) {
      if (record[dishId]) {
        const dish = dishesModel.find(({ id }) => id === dishId);
        if (dish?.checked) {
          dishes.push(dish);
        }
      }
    }

    return dishes;
  }
}

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, of, startWith } from 'rxjs';

import { MealConfig } from './meal-edit-form.component';

export class MealEditForm extends FormGroup<{
  name: FormControl<string>;
  description: FormControl<string>;
  dishesModel: FormGroup<Record<string, FormControl<boolean>>>;
  tagsModel: FormGroup<Record<string, FormControl<boolean>>>;
}> {
  dishes$ =
    this.get('dishesModel')?.valueChanges.pipe(
      startWith(
        this.meal.dishesModel.reduce<Record<string, boolean>>(
          (states, { id, checked }) => {
            states[id] = checked;
            return states;
          },
          {}
        )
      ),
      map((dishIds) => this.meal.dishesModel.filter(({ id }) => dishIds[id]))
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
}

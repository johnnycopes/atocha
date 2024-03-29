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
  dishIds: FormGroup<Record<string, FormControl<boolean>>>;
  tagIds: FormGroup<Record<string, FormControl<boolean>>>;
}> {
  dishes$ =
    this.get('dishIds')?.valueChanges.pipe(
      startWith(
        this.meal.dishModels.reduce<Record<string, boolean>>(
          (dishIds, { id, checked }) => {
            dishIds[id] = checked;
            return dishIds;
          },
          {}
        )
      ),
      map((dishIds) => this.meal.dishModels.filter(({ id }) => dishIds[id]))
    ) ?? of([]);

  constructor(
    readonly meal: MealConfig,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.nonNullable.group({
        name: fb.nonNullable.control(meal.name, Validators.required),
        description: fb.nonNullable.control(meal.description),
        dishIds: fb.nonNullable.group(
          meal.dishModels.reduce<Record<string, FormControl<boolean>>>(
            (group, dish) => {
              group[dish.id] = fb.nonNullable.control(dish.checked);
              return group;
            },
            {}
          )
        ),
        tagIds: fb.nonNullable.group(
          meal.tagModels.reduce<Record<string, FormControl<boolean>>>(
            (group, tag) => {
              group[tag.id] = fb.nonNullable.control(tag.checked);
              return group;
            },
            {}
          )
        ),
      }).controls
    );
  }
}

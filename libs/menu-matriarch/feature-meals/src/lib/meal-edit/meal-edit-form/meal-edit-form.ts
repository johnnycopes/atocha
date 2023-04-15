import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MealEditDetails, MealEditForm } from './meal-edit-form.component';

export class MealEditFormClass extends FormGroup<MealEditForm> {
  constructor(
    readonly details: MealEditDetails,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.nonNullable.group<MealEditForm>({
        name: fb.nonNullable.control(details.meal.name, Validators.required),
        description: fb.nonNullable.control(details.meal.description),
        dishIds: fb.nonNullable.group(
          details.allDishes.reduce<Record<string, FormControl<boolean>>>(
            (group, { id }) => {
              group[id] = fb.nonNullable.control(
                details.meal.dishes.map(({ id }) => id).includes(id)
              );
              return group;
            },
            {}
          )
        ),
        tagIds: fb.nonNullable.group(
          details.allTags.reduce<Record<string, FormControl<boolean>>>(
            (group, { id }) => {
              group[id] = fb.nonNullable.control(
                details.meal.tags.map(({ id }) => id).includes(id)
              );
              return group;
            },
            {}
          )
        ),
      }).controls
    );
  }
}

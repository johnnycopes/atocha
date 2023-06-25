import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { DishType } from '@atocha/menu-matriarch/shared/util';
import { DishConfig } from './dish-edit-form.component';

export class DishEditForm extends FormGroup<{
  name: FormControl<string>;
  description: FormControl<string>;
  link: FormControl<string>;
  type: FormControl<DishType>;
  ingredientIds: FormGroup<Record<string, FormControl<boolean>>>;
  tagIds: FormGroup<Record<string, FormControl<boolean>>>;
  notes: FormControl<string>;
}> {
  constructor(
    readonly dish: DishConfig,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.nonNullable.group({
        name: fb.nonNullable.control(dish.name, Validators.required),
        description: fb.nonNullable.control(dish.description),
        link: fb.nonNullable.control(dish.link),
        type: fb.nonNullable.control(dish.type),
        ingredientIds: fb.nonNullable.group(
          dish.ingredientModels.reduce<Record<string, FormControl<boolean>>>(
            (group, ingredient) => {
              group[ingredient.id] = fb.nonNullable.control(ingredient.checked);
              return group;
            },
            {}
          )
        ),
        tagIds: fb.nonNullable.group(
          dish.tagModels.reduce<Record<string, FormControl<boolean>>>(
            (group, tag) => {
              group[tag.id] = fb.nonNullable.control(tag.checked);
              return group;
            },
            {}
          )
        ),
        notes: fb.nonNullable.control(dish.notes),
      }).controls
    );
  }
}

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { DishType } from '@atocha/menu-matriarch/util';
import { DishConfig } from './dish-edit-form.component';

export class DishEditForm extends FormGroup<{
  name: FormControl<string>;
  description: FormControl<string>;
  link: FormControl<string>;
  type: FormControl<DishType>;
  tagsModel: FormGroup<Record<string, FormControl<boolean>>>;
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
        tagsModel: fb.nonNullable.group(
          dish.tagsModel.reduce<Record<string, FormControl<boolean>>>(
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

import { FormBuilder, FormGroup } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { MealEditModel } from './meal-edit-form.component';

export class MealEditForm extends FormGroup<Form<MealEditModel>> {
  constructor(
    readonly model: MealEditModel,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.nonNullable.group({
        name: fb.nonNullable.control(model.name),
        description: fb.nonNullable.control(model.description),
        tags: fb.nonNullable.control(model.tags),
        dishesModel: fb.nonNullable.control(model.dishesModel),
      }).controls,
      {
        validators: [],
      }
    );
  }
}

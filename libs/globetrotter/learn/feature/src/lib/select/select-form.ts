import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Selection } from '@atocha/globetrotter/learn/data-access';

export class SelectForm extends FormGroup<Form<Selection>> {
  readonly type = this.controls.type;
  readonly quantity = this.controls.quantity;
  readonly places = this.controls.places;

  constructor(
    readonly selection: Selection,
    readonly fb: NonNullableFormBuilder = new FormBuilder().nonNullable
  ) {
    super(
      fb.group({
        type: fb.control(selection.type),
        quantity: fb.control(selection.quantity),
        places: fb.control(selection.places),
      }).controls,
      {
        validators: [],
      }
    );
  }
}

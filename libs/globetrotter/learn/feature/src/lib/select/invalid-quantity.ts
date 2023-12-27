import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { Selection } from '@atocha/globetrotter/learn/util';

export const invalidQuantity: ValidatorFn = (
  control: AbstractControl<Selection>
): ValidationErrors | null => {
  const quantity = control.value.quantity;
  const numberOfPlaces = control.value.places.length;
  numberOfPlaces;

  return quantity < 2 ? { invalidQuantity: 'Invalid quantity' } : null;
};

import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { Selection } from '@atocha/globetrotter/learn/util';

export function invalidQuantity(
  getNumberOfCountries: (placeName: string) => number
): ValidatorFn {
  return (control: AbstractControl<Selection>): ValidationErrors | null => {
    const quantity = control.value.quantity;
    const numberOfPlaces = control.value.places.length;
    getNumberOfCountries;

    return quantity < 2 || numberOfPlaces === 0
      ? { invalidQuantity: 'Invalid quantity' }
      : null;
  };
}

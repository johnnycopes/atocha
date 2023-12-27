import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { Selection } from '@atocha/globetrotter/learn/util';

export function invalidQuantity(
  getNumberOfCountries: (placeName: string) => number
): ValidatorFn {
  return (control: AbstractControl<Selection>): ValidationErrors | null => {
    const quantity = control.value.quantity;
    const numberOfPlaces = control.value.places.length;
    const selectedCountriesQuantity = control.value.places.reduce(
      (total, name) =>
        getNumberOfCountries(name) ? total + getNumberOfCountries(name) : total,
      0
    );

    return quantity < 2 ||
      numberOfPlaces === 0 ||
      quantity > selectedCountriesQuantity
      ? { invalidQuantity: 'Invalid quantity' }
      : null;
  };
}

import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { Selection } from '@atocha/globetrotter/learn/util';

export function invalidSelection(
  getNumberOfCountries: (placeName: string) => number
): ValidatorFn {
  return (control: AbstractControl<Selection>): ValidationErrors | null => {
    const quantity = control.value.quantity;
    const places = control.value.places;
    const selectedCountriesQuantity = places.reduce(
      (total, name) => total + getNumberOfCountries(name),
      0
    );

    return quantity < 2 ||
      places.length === 0 ||
      quantity > selectedCountriesQuantity
      ? { invalidSelection: 'Invalid quantity' }
      : null;
  };
}

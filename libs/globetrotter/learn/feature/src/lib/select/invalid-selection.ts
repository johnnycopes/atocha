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

    const errors: ValidationErrors = {};
    if (quantity < 2) {
      errors['invalidQuantity'] = 'At least two cards must be selected';
    }

    if (places.length === 0) {
      errors['invalidPlaces'] = 'At least two countries must be selected';
    }

    if (quantity > selectedCountriesQuantity) {
      errors['insufficientPlaces'] =
        'Number of countries must exceed number of cards';
    }
    return Object.keys(errors).length > 0 ? errors : null;
  };
}

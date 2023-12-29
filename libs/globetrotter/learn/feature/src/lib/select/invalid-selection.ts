import { ValidatorFn, AbstractControl } from '@angular/forms';

import { Selection } from '@atocha/globetrotter/learn/util';

export interface SelectionErrors {
  invalidQuantity: 'At least two cards must be selected' | null;
  invalidPlaces: 'At least two countries must be selected' | null;
  insufficientPlaces: 'Number of countries must exceed number of cards' | null;
}

export function invalidSelection(
  getNumberOfCountries: (placeName: string) => number
): ValidatorFn {
  return (control: AbstractControl<Selection>): SelectionErrors => {
    const quantity = control.value.quantity;
    const places = control.value.places;
    const selectedCountriesQuantity = places.reduce(
      (total, name) => total + getNumberOfCountries(name),
      0
    );

    return {
      invalidQuantity:
        quantity < 2 ? 'At least two cards must be selected' : null,
      invalidPlaces:
        places.length === 0 ? 'At least two countries must be selected' : null,
      insufficientPlaces:
        quantity > selectedCountriesQuantity
          ? 'Number of countries must exceed number of cards'
          : null,
    };
  };
}

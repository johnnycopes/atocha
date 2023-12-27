import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Selection } from '@atocha/globetrotter/learn/util';
import { invalidQuantity } from './invalid-quantity';

describe('invalidQuantity', () => {
  const fb = new FormBuilder().nonNullable;

  const MOCK_GET_NUMBER_OF_COUNTRIES = (placeName: string): number => {
    switch (placeName) {
      case 'Micronesia':
        return 8;
      case 'Eastern Europe':
        return 5;
      case 'Central America':
        return 3;
      default:
        return 0;
    }
  };

  describe('returns an error', () => {
    it('if quantity is less than 2', () => {
      expect(
        invalidQuantity(MOCK_GET_NUMBER_OF_COUNTRIES)(
          fb.group<Pick<Form<Selection>, 'quantity' | 'places'>>({
            quantity: fb.control(1),
            places: fb.control(['Micronesia']),
          })
        )
      ).toEqual({ invalidQuantity: 'Invalid quantity' });
    });

    it('if fewer than 2 countries are selected', () => {
      expect(
        invalidQuantity(MOCK_GET_NUMBER_OF_COUNTRIES)(
          fb.group<Pick<Form<Selection>, 'quantity' | 'places'>>({
            quantity: fb.control(2),
            places: fb.control([]),
          })
        )
      ).toEqual({ invalidQuantity: 'Invalid quantity' });
    });
  });
});

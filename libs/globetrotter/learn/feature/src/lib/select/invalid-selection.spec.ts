import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Selection } from '@atocha/globetrotter/learn/util';
import { invalidSelection } from './invalid-selection';

describe('invalidSelection', () => {
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

  it('returns an error if fewer than 2 countries are selected', () => {
    expect(
      invalidSelection(MOCK_GET_NUMBER_OF_COUNTRIES)(
        fb.group<Pick<Form<Selection>, 'quantity' | 'places'>>({
          quantity: fb.control(2),
          places: fb.control([]),
        })
      )
    ).toEqual({ invalidSelection: 'Invalid quantity' });
  });

  it('returns an error if quantity is less than 2', () => {
    expect(
      invalidSelection(MOCK_GET_NUMBER_OF_COUNTRIES)(
        fb.group<Pick<Form<Selection>, 'quantity' | 'places'>>({
          quantity: fb.control(1),
          places: fb.control(['Central America']),
        })
      )
    ).toEqual({ invalidSelection: 'Invalid quantity' });
  });

  it('returns an error if quantity exceeds number of selected countries', () => {
    expect(
      invalidSelection(MOCK_GET_NUMBER_OF_COUNTRIES)(
        fb.group<Pick<Form<Selection>, 'quantity' | 'places'>>({
          quantity: fb.control(9),
          places: fb.control(['Micronesia']),
        })
      )
    ).toEqual({ invalidSelection: 'Invalid quantity' });
  });

  it('returns null otherwise', () => {
    expect(
      invalidSelection(MOCK_GET_NUMBER_OF_COUNTRIES)(
        fb.group<Pick<Form<Selection>, 'quantity' | 'places'>>({
          quantity: fb.control(5),
          places: fb.control(['Eastern Europe', 'Central America']),
        })
      )
    ).toEqual(null);
  });
});

import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Selection } from '@atocha/globetrotter/learn/util';
import { invalidQuantity } from './invalid-quantity';

describe('invalidQuantity', () => {
  const fb = new FormBuilder().nonNullable;

  it('returns an error if quantity is less than 2', () => {
    expect(
      invalidQuantity(
        fb.group<Pick<Form<Selection>, 'quantity' | 'places'>>({
          quantity: fb.control(1),
          places: fb.control([]),
        })
      )
    ).toEqual({ invalidQuantity: 'Invalid quantity' });
  });
});

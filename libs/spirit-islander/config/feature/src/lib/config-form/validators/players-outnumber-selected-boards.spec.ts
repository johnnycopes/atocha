import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Config } from '@atocha/spirit-islander/config/util';
import { playersOutnumberSelectedBoards } from './validators';

describe('playersOutnumberSelectedBoards', () => {
  const fbnn = new FormBuilder().nonNullable;

  it('returns an error if player count is greater than boards count', () => {
    expect(
      playersOutnumberSelectedBoards(
        fbnn.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
          players: fbnn.control(2),
          boardNames: fbnn.control(['A']),
        })
      )
    ).toEqual({
      playersOutnumberSelectedBoards:
        'At least 2 boards must be selected (must match or exceed player count)',
    });
  });

  it('returns null if boards count is greater than or equal to players count', () => {
    expect(
      playersOutnumberSelectedBoards(
        fbnn.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
          players: fbnn.control(2),
          boardNames: fbnn.control(['A', 'B']),
        })
      )
    ).toBe(null);
  });
});

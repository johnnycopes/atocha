import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Config } from '@atocha/spirit-islander/config/util';
import { playersOutnumberSelectedBoards } from './players-outnumber-selected-boards';

describe('playersOutnumberSelectedBoards', () => {
  const fb = new FormBuilder().nonNullable;

  it('returns an error if player count is greater than boards count', () => {
    expect(
      playersOutnumberSelectedBoards(
        fb.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
          players: fb.control(2),
          boardNames: fb.control(['A']),
        })
      )
    ).toStrictEqual({
      playersOutnumberSelectedBoards:
        'At least 2 boards must be selected (must match or exceed player count)',
    });
  });

  it('returns null if boards count is greater than or equal to players count', () => {
    expect(
      playersOutnumberSelectedBoards(
        fb.group<Pick<Form<Config>, 'players' | 'boardNames'>>({
          players: fb.control(2),
          boardNames: fb.control(['A', 'B']),
        })
      )
    ).toBe(null);
  });
});

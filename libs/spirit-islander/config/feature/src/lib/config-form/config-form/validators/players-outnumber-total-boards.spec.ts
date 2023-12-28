import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Config } from '@atocha/spirit-islander/config/util';
import { playersOutnumberTotalBoards } from './players-outnumber-total-boards';

describe('playersOutnumberTotalBoards', () => {
  const fb = new FormBuilder().nonNullable;

  it('returns an error if player count is greater than 4 and Jagged Earth is not included', () => {
    expect(
      playersOutnumberTotalBoards(
        fb.group<Pick<Form<Config>, 'expansions' | 'players'>>({
          expansions: fb.control([]),
          players: fb.control(5),
        })
      )
    ).toStrictEqual({
      playersOutnumberTotalBoards:
        'Cannot generate a setup with more than 4 players unless playing with the Jagged Earth expansion',
    });
  });

  it('returns null if player count is greater than 4 and Jagged Earth is included', () => {
    expect(
      playersOutnumberTotalBoards(
        fb.group<Pick<Form<Config>, 'expansions' | 'players'>>({
          expansions: fb.control(['Jagged Earth']),
          players: fb.control(5),
        })
      )
    ).toBe(null);
  });

  it('returns null if player count is less than 5, regardless of expansions', () => {
    expect(
      playersOutnumberTotalBoards(
        fb.group<Pick<Form<Config>, 'expansions' | 'players'>>({
          expansions: fb.control([]),
          players: fb.control(4),
        })
      )
    ).toBe(null);
  });
});

import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Config } from '@atocha/spirit-islander/config/util';
import { playersOutnumberTotalBoards } from './validators';

describe('playersOutnumberTotalBoards', () => {
  const fbnn = new FormBuilder().nonNullable;

  it('returns an error if player count is greater than 4 and Jagged Earth is not included', () => {
    expect(
      playersOutnumberTotalBoards(
        fbnn.group<Pick<Form<Config>, 'expansions' | 'players'>>({
          expansions: fbnn.control([]),
          players: fbnn.control(5),
        })
      )
    ).toEqual({
      playersOutnumberTotalBoards:
        'Cannot generate a setup with more than 4 players unless playing with the Jagged Earth expansion',
    });
  });

  it('returns null if player count is greater than 4 and Jagged Earth is included', () => {
    expect(
      playersOutnumberTotalBoards(
        fbnn.group<Pick<Form<Config>, 'expansions' | 'players'>>({
          expansions: fbnn.control(['Jagged Earth']),
          players: fbnn.control(5),
        })
      )
    ).toBe(null);
  });

  it('returns null if player count is less than 5, regardless of expansions', () => {
    expect(
      playersOutnumberTotalBoards(
        fbnn.group<Pick<Form<Config>, 'expansions' | 'players'>>({
          expansions: fbnn.control([]),
          players: fbnn.control(4),
        })
      )
    ).toBe(null);
  });
});

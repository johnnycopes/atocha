import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Config } from '@atocha/spirit-islander/config/util';
import { playersOutnumberSpirits } from './validators';

describe('playersOutnumberSpirits', () => {
  const fbnn = new FormBuilder().nonNullable;

  it('returns an error if player count is greater than spirits count', () => {
    expect(
      playersOutnumberSpirits(
        fbnn.group<Pick<Form<Config>, 'players' | 'spiritNames'>>({
          players: fbnn.control(2),
          spiritNames: fbnn.control(['Thunderspeaker']),
        })
      )
    ).toEqual({
      playersOutnumberSpirits: 'At least 2 unique spirits must be selected',
    });
  });

  it('returns null if spirits count is greater than or equal to spirits count', () => {
    expect(
      playersOutnumberSpirits(
        fbnn.group<Pick<Form<Config>, 'players' | 'spiritNames'>>({
          players: fbnn.control(1),
          spiritNames: fbnn.control(['Thunderspeaker']),
        })
      )
    ).toBe(null);
  });
});

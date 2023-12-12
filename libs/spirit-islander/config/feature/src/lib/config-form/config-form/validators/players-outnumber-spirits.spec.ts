import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Config } from '@atocha/spirit-islander/config/util';
import { playersOutnumberSpirits } from './players-outnumber-spirits';

describe('playersOutnumberSpirits', () => {
  const fb = new FormBuilder().nonNullable;

  it('returns an error if player count is greater than spirits count', () => {
    expect(
      playersOutnumberSpirits(
        fb.group<Pick<Form<Config>, 'players' | 'spiritNames'>>({
          players: fb.control(2),
          spiritNames: fb.control(['Thunderspeaker']),
        })
      )
    ).toEqual({
      playersOutnumberSpirits: 'At least 2 unique spirits must be selected',
    });
  });

  it('returns null if spirits count is greater than or equal to spirits count', () => {
    expect(
      playersOutnumberSpirits(
        fb.group<Pick<Form<Config>, 'players' | 'spiritNames'>>({
          players: fb.control(1),
          spiritNames: fb.control(['Thunderspeaker']),
        })
      )
    ).toBe(null);
  });
});

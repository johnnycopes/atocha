import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Config } from '@atocha/spirit-islander/config/util';
import { invalidDifficultyRange } from './invalid-difficulty-range';

describe('invalidDifficultyRange', () => {
  const fbnn = new FormBuilder().nonNullable;

  it('returns an error if minimum difficulty exceeds maximum difficulty', () => {
    expect(
      invalidDifficultyRange(
        fbnn.group<Form<Config>>({
          expansions: fbnn.control([]),
          players: fbnn.control(1),
          difficultyRange: fbnn.control([1, 0]),
          spiritNames: fbnn.control(['Thunderspeaker']),
          mapNames: fbnn.control(['Balanced']),
          boardNames: fbnn.control(['A']),
          scenarioNames: fbnn.control(['No Scenario']),
          adversaryLevelIds: fbnn.control(['none']),
        })
      )
    ).toEqual({ invalidDifficultyRange: 'Minimum cannot exceed maximum' });
  });

  it('returns an error if valid combos cannot be generated', () => {
    expect(
      invalidDifficultyRange(
        fbnn.group<Form<Config>>({
          expansions: fbnn.control([]),
          players: fbnn.control(1),
          difficultyRange: fbnn.control([10, 15]),
          spiritNames: fbnn.control(['Thunderspeaker']),
          mapNames: fbnn.control(['Balanced']),
          boardNames: fbnn.control(['A']),
          scenarioNames: fbnn.control(['No Scenario']),
          adversaryLevelIds: fbnn.control(['none']),
        })
      )
    ).toEqual({
      invalidDifficultyRange: `
      Combination of selected maps, adversaries, and scenarios cannot
      generate a setup between difficulty levels 10 and 15
    `,
    });
  });

  it('returns null if maximum difficulty exceeds minimum difficulty and valid combos can be generated', () => {
    expect(
      invalidDifficultyRange(
        fbnn.group<Form<Config>>({
          expansions: fbnn.control([]),
          players: fbnn.control(1),
          difficultyRange: fbnn.control([0, 1]),
          spiritNames: fbnn.control(['Thunderspeaker']),
          mapNames: fbnn.control(['Balanced']),
          boardNames: fbnn.control(['A']),
          scenarioNames: fbnn.control(['No Scenario']),
          adversaryLevelIds: fbnn.control(['none']),
        })
      )
    ).toBe(null);
  });
});

import { FormBuilder } from '@angular/forms';

import { Form } from '@atocha/core/ui';
import { Config } from '@atocha/spirit-islander/config/util';
import { invalidDifficultyRange } from './invalid-difficulty-range';

describe('invalidDifficultyRange', () => {
  const fb = new FormBuilder().nonNullable;

  it('returns an error if minimum difficulty exceeds maximum difficulty', () => {
    expect(
      invalidDifficultyRange(
        fb.group<Form<Config>>({
          expansions: fb.control([]),
          players: fb.control(1),
          difficultyRange: fb.control([1, 0]),
          spiritNames: fb.control(['Thunderspeaker']),
          mapNames: fb.control(['Balanced']),
          boardNames: fb.control(['A']),
          scenarioNames: fb.control(['No Scenario']),
          adversaryLevelIds: fb.control(['none']),
        })
      )
    ).toStrictEqual({
      invalidDifficultyRange: 'Minimum cannot exceed maximum',
    });
  });

  it('returns an error if valid combos cannot be generated', () => {
    expect(
      invalidDifficultyRange(
        fb.group<Form<Config>>({
          expansions: fb.control([]),
          players: fb.control(1),
          difficultyRange: fb.control([10, 15]),
          spiritNames: fb.control(['Thunderspeaker']),
          mapNames: fb.control(['Balanced']),
          boardNames: fb.control(['A']),
          scenarioNames: fb.control(['No Scenario']),
          adversaryLevelIds: fb.control(['none']),
        })
      )
    ).toStrictEqual({
      invalidDifficultyRange: `
      Combination of selected maps, adversaries, and scenarios cannot
      generate a setup between difficulty levels 10 and 15
    `,
    });
  });

  it('returns null if maximum difficulty exceeds minimum difficulty and valid combos can be generated', () => {
    expect(
      invalidDifficultyRange(
        fb.group<Form<Config>>({
          expansions: fb.control([]),
          players: fb.control(1),
          difficultyRange: fb.control([0, 1]),
          spiritNames: fb.control(['Thunderspeaker']),
          mapNames: fb.control(['Balanced']),
          boardNames: fb.control(['A']),
          scenarioNames: fb.control(['No Scenario']),
          adversaryLevelIds: fb.control(['none']),
        })
      )
    ).toBe(null);
  });
});

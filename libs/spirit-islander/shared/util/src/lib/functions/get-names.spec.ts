import { getNames } from './get-names';
import { SCENARIOS } from '../game';

describe('getNames', () => {
  it('returns only the names from a group of options', () => {
    const scenarios = SCENARIOS.slice(0, 5);
    expect(getNames(scenarios)).toEqual([
      'No Scenario',
      'Blitz',
      "Guard the Isle's Heart",
      'Second Wave',
      'A Diversity of Spirits',
    ]);
  });
});

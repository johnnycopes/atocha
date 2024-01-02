import { getNames } from './get-names';
import { getScenarios } from './get-scenarios';

describe('getNames', () => {
  it('returns only the names from a group of options', () => {
    const scenarios = getScenarios().slice(0, 5);
    expect(getNames(scenarios)).toStrictEqual([
      'No Scenario',
      'Destiny Unfolds',
      'Blitz',
      "Guard the Isle's Heart",
      'Second Wave',
    ]);
  });
});

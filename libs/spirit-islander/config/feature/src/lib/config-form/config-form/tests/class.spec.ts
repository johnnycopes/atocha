import { Config } from '@atocha/spirit-islander/config/util';
import { ConfigForm } from '../config-form';

describe('ConfigForm', () => {
  let config: Config;

  beforeEach(() => {
    config = {
      expansions: ['Branch & Claw'],
      players: 2,
      difficultyRange: [0, 3],
      spiritNames: [
        'A Spread of Rampant Green',
        'Thunderspeaker',
        'Keeper of the Forbidden Wilds',
      ],
      mapNames: ['Balanced'],
      boardNames: ['A', 'C', 'D'],
      scenarioNames: ['No Scenario', 'Blitz'],
      adversaryLevelIds: ['none', 'bp-0', 'bp-1', 'bp-2'],
    };
  });

  it('renders', () => {
    expect(new ConfigForm(config)).toBeTruthy();
  });

  it('has value that matches the passed-in model', () => {
    expect(new ConfigForm(config).value).toStrictEqual(config);
  });

  it('exposes observable of selected expansions', (done) => {
    const form = new ConfigForm(config);
    form.expansions$.subscribe((value) => {
      expect(value).toStrictEqual(['Jagged Earth']);
      done();
    });

    form.patchValue({ expansions: ['Jagged Earth'] });
  });
});

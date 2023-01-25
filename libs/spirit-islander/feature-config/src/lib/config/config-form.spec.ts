import { ConfigForm } from './config-form';

describe('ConfigForm', () => {
  it('renders', () => {
    expect(
      new ConfigForm({
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
        adversaryNamesAndIds: ['No Adversary', 'bp-0', 'bp-1', 'bp-2'],
      })
    ).toBeTruthy();
  });

  it('has value that matches the passed-in model', () => {
    expect(
      new ConfigForm({
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
        adversaryNamesAndIds: ['No Adversary', 'bp-0', 'bp-1', 'bp-2'],
      }).value
    ).toStrictEqual({
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
      adversaryNamesAndIds: ['No Adversary', 'bp-0', 'bp-1', 'bp-2'],
    });
  });
});

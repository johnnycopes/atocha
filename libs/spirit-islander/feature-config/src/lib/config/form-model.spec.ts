import { ConfigFormModel, modelToConfig } from './form-model';

describe('modelToConfig', () => {
  it('converts a form model object to a Config object', () => {
    const model: ConfigFormModel = {
      expansions: ['Horizons', 'Jagged Earth', 'Branch & Claw'],
      players: 5,
      difficultyRange: [0, 8],
      spiritNames: [
        'A Spread of Rampant Green',
        'Bringer of Dreams and Nightmares',
        'Keeper of the Forbidden Wilds',
        "Lightning's Swift Strike",
        "Ocean's Hungry Grasp",
        'River Surges in Sunlight',
        'Shadows Flicker Like Flame',
        'Sharp Fangs Behind the Leaves',
        'Thunderspeaker',
        'Vital Strength of the Earth',
      ],
      mapNames: ['Balanced', 'Thematic'],
      boards: ['A', 'C', 'D', 'E', 'F'],
      scenarios: ['No Scenario', 'Second Wave', 'Despicable Theft'],
      adversaries: ['No Adversary', 'bp-1', 'bp-2'],
    };

    expect(modelToConfig(model)).toEqual({
      expansions: ['Horizons', 'Jagged Earth', 'Branch & Claw'],
      players: 5,
      difficultyRange: [0, 8],
      spiritNames: [
        'A Spread of Rampant Green',
        'Bringer of Dreams and Nightmares',
        'Keeper of the Forbidden Wilds',
        "Lightning's Swift Strike",
        "Ocean's Hungry Grasp",
        'River Surges in Sunlight',
        'Shadows Flicker Like Flame',
        'Sharp Fangs Behind the Leaves',
        'Thunderspeaker',
        'Vital Strength of the Earth',
      ],
      mapNames: ['Balanced', 'Thematic'],
      boardNames: ['A', 'C', 'D', 'E', 'F'],
      scenarioNames: ['No Scenario', 'Second Wave', 'Despicable Theft'],
      adversaryNamesAndIds: ['No Adversary', 'bp-1', 'bp-2'],
    });
  });
});

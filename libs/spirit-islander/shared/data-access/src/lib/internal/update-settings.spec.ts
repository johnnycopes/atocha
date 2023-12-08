import { Config } from '@atocha/spirit-islander/config/util';
import { createDefaultSettings } from '@atocha/spirit-islander/settings/util';
import { createGameSetup } from '@atocha/spirit-islander/game-setup/util';
import { AppState } from './app-state.interface';
import { updateSettings } from './update-settings';

describe('updateSettings', () => {
  let mockState: AppState;

  beforeEach(() => {
    const mockConfig: Config = {
      expansions: [],
      players: 2,
      difficultyRange: [0, 1],
      spiritNames: ['Thunderspeaker', 'Vital Strength of the Earth'],
      mapNames: ['Balanced'],
      boardNames: ['A', 'B'],
      scenarioNames: ['No Scenario'],
      adversaryLevelIds: ['none'],
    };
    const mockSettings = createDefaultSettings();

    mockState = {
      config: mockConfig,
      gameSetup: createGameSetup(mockConfig, mockSettings),
      settings: mockSettings,
    };
  });

  it('returns a state object which only has updated settings', () => {
    expect(updateSettings({ randomThematicBoards: true }, mockState)).toEqual({
      ...mockState,
      settings: { ...mockState.settings, randomThematicBoards: true },
    });
  });
});

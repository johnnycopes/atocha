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

  describe('when `allowBEAndDFBoards` setting is disabled', () => {
    it('returns an updated state object with settings changed and all boards selected (no Jagged Earth)', () => {
      expect(updateSettings({ allowBEAndDFBoards: false }, mockState)).toEqual({
        gameSetup: mockState.gameSetup,
        config: {
          ...mockState.config,
          boardNames: ['A', 'B', 'C', 'D'],
        },
        settings: {
          ...mockState.settings,
          allowBEAndDFBoards: false,
        },
      });
    });

    it('returns an updated state object with settings changed and all boards selected (Jagged Earth)', () => {
      mockState.config.expansions = ['Jagged Earth'];
      mockState.config.boardNames = ['B', 'E'];

      expect(updateSettings({ allowBEAndDFBoards: false }, mockState)).toEqual({
        gameSetup: mockState.gameSetup,
        config: {
          ...mockState.config,
          boardNames: ['A', 'B', 'C', 'D', 'E', 'F'],
        },
        settings: {
          ...mockState.settings,
          allowBEAndDFBoards: false,
        },
      });
    });
  });

  describe('when settings are modified in any other way', () => {
    it('returns an updated state object with only settings changed', () => {
      expect(updateSettings({ randomThematicBoards: true }, mockState)).toEqual(
        {
          ...mockState,
          settings: { ...mockState.settings, randomThematicBoards: true },
        }
      );
    });
  });
});

import { convertToParamMap } from '@angular/router';
import {
  mapConfigToQueryParams as mapConfigToParamMap,
  mapParamMapToConfig,
} from './url-mappers';

describe('URL mappers', () => {
  describe('mapConfigToQueryParams', () => {
    it('returns a ParamMap', () => {
      expect(
        mapConfigToParamMap({
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
        })
      ).toEqual({
        expansions: '["Branch & Claw"]',
        players: '2',
        difficultyRange: '[0,3]',
        spiritNames:
          '["A Spread of Rampant Green","Thunderspeaker","Keeper of the Forbidden Wilds"]',
        boardNames: '["A","C","D"]',
        mapNames: '["Balanced"]',
        scenarioNames: '["No Scenario","Blitz"]',
        adversaryLevelIds: '["none","bp-0","bp-1","bp-2"]',
      });
    });
  });

  describe('mapParamMapToConfig', () => {
    it('returns a Config object', () => {
      expect(
        mapParamMapToConfig(
          convertToParamMap({
            expansions: '["Branch & Claw"]',
            players: '2',
            difficultyRange: '[0,3]',
            spiritNames:
              '["A Spread of Rampant Green","Thunderspeaker","Keeper of the Forbidden Wilds"]',
            boardNames: '["A","C","D"]',
            mapNames: '["Balanced"]',
            scenarioNames: '["No Scenario","Blitz"]',
            adversaryLevelIds: '["none","bp-0","bp-1","bp-2"]',
          })
        )
      ).toEqual({
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
      });
    });
  });
});

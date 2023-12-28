import { convertToParamMap } from '@angular/router';
import {
  mapConfigToParams as mapConfigToParamMap,
  mapParamsToConfig,
} from './url-mappers';

describe('URL mappers', () => {
  describe('mapConfigToParamMap', () => {
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
      ).toStrictEqual({
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

  describe('mapParamsToConfig', () => {
    it('returns a Config', () => {
      expect(
        mapParamsToConfig(
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
        adversaryLevelIds: ['none', 'bp-0', 'bp-1', 'bp-2'],
      });
    });
  });
});

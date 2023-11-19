import { migrateConfig } from './app-migration';

describe('App Migration', () => {
  it('modernizeConfig', () => {
    expect(
      migrateConfig(
        '{"expansions":["Jagged Earth"],"players":3,"difficultyRange":[2,8],"mapNames":["Thematic"],"boardNames":["A","B","C","D","E","F"],"spiritNames":["A Spread of Rampant Green","Bringer of Dreams and Nightmares","Thunderspeaker"],"scenarioNames":["No Scenario"],"adversaryNamesAndIds":["bp-0","bp-1","bp-2","bp-3"]}'
      )
    ).toBe(
      '{"expansions":["Jagged Earth"],"players":3,"difficultyRange":[2,8],"mapNames":["Thematic"],"boardNames":["A","B","C","D","E","F"],"spiritNames":["A Spread of Rampant Green","Bringer of Dreams and Nightmares","Thunderspeaker"],"scenarioNames":["No Scenario"],"adversaryLevelIds":["bp-0","bp-1","bp-2","bp-3"]}'
    );
  });
});

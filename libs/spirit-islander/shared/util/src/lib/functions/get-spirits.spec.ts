import { SPIRITS } from '../data';
import { getSpirits } from './get-spirits';

describe('getSpirits', () => {
  it('returns all spirits if expansions argument is omitted', () => {
    expect(getSpirits()).toStrictEqual(SPIRITS);
  });

  it('returns spirits from base game', () => {
    expect(getSpirits({ expansions: [] })).toStrictEqual([
      {
        name: 'A Spread of Rampant Green',
        spiritIdentifier: 'ASpreadOfRampantGreen',
      },
      {
        name: 'Bringer of Dreams and Nightmares',
        spiritIdentifier: 'BringerOfDreamsAndNightmares',
      },
      {
        name: "Lightning's Swift Strike",
        spiritIdentifier: 'LightningsSwiftStrike',
      },
      { name: "Ocean's Hungry Grasp", spiritIdentifier: 'OceansHungryGrasp' },
      {
        name: 'River Surges in Sunlight',
        spiritIdentifier: 'RiverSurgesInSunlight',
      },
      {
        name: 'Shadows Flicker Like Flame',
        spiritIdentifier: 'ShadowsFlickerLikeFlame',
      },
      { name: 'Thunderspeaker', spiritIdentifier: 'Thunderspeaker' },
      {
        name: 'Vital Strength of the Earth',
        spiritIdentifier: 'VitalStrengthOfTheEarth',
      },
    ]);
  });

  it('returns spirits from base game plus any specified expansions', () => {
    expect(getSpirits({ expansions: ['Branch & Claw'] })).toStrictEqual([
      {
        name: 'A Spread of Rampant Green',
        spiritIdentifier: 'ASpreadOfRampantGreen',
      },
      {
        name: 'Bringer of Dreams and Nightmares',
        spiritIdentifier: 'BringerOfDreamsAndNightmares',
      },
      {
        name: 'Keeper of the Forbidden Wilds',
        expansion: 'Branch & Claw',
        spiritIdentifier: 'KeeperOfTheForbiddenWilds',
      },
      {
        name: "Lightning's Swift Strike",
        spiritIdentifier: 'LightningsSwiftStrike',
      },
      { name: "Ocean's Hungry Grasp", spiritIdentifier: 'OceansHungryGrasp' },
      {
        name: 'River Surges in Sunlight',
        spiritIdentifier: 'RiverSurgesInSunlight',
      },
      {
        name: 'Shadows Flicker Like Flame',
        spiritIdentifier: 'ShadowsFlickerLikeFlame',
      },
      {
        name: 'Sharp Fangs Behind the Leaves',
        expansion: 'Branch & Claw',
        spiritIdentifier: 'SharpFangsBehindTheLeaves',
      },
      { name: 'Thunderspeaker', spiritIdentifier: 'Thunderspeaker' },
      {
        name: 'Vital Strength of the Earth',
        spiritIdentifier: 'VitalStrengthOfTheEarth',
      },
    ]);
  });

  it('returns aspects only if their associated spirit is also returned', () => {
    expect(getSpirits({ expansions: ['Nature Incarnate'] })).toStrictEqual([
      {
        name: 'A Spread of Rampant Green',
        spiritIdentifier: 'ASpreadOfRampantGreen',
      },
      {
        name: 'Regrowth',
        expansion: 'Nature Incarnate',
        aspectOf: 'A Spread of Rampant Green',
      },
      {
        name: 'Tangles',
        expansion: 'Nature Incarnate',
        aspectOf: 'A Spread of Rampant Green',
      },
      {
        name: 'Breath of Darkness Down Your Spine',
        expansion: 'Nature Incarnate',
      },
      {
        name: 'Bringer of Dreams and Nightmares',
        spiritIdentifier: 'BringerOfDreamsAndNightmares',
      },
      {
        name: 'Enticing',
        expansion: 'Nature Incarnate',
        aspectOf: 'Bringer of Dreams and Nightmares',
      },
      {
        name: 'Violence',
        expansion: 'Nature Incarnate',
        aspectOf: 'Bringer of Dreams and Nightmares',
      },
      {
        expansion: 'Nature Incarnate',
        name: 'Dances Up Earthquakes',
      },
      { name: 'Ember-Eyed Behemoth', expansion: 'Nature Incarnate' },
      { name: 'Hearth-Vigil', expansion: 'Nature Incarnate' },
      {
        name: "Lightning's Swift Strike",
        spiritIdentifier: 'LightningsSwiftStrike',
      },
      {
        name: 'Sparking',
        expansion: 'Nature Incarnate',
        aspectOf: "Lightning's Swift Strike",
      },
      { name: "Ocean's Hungry Grasp", spiritIdentifier: 'OceansHungryGrasp' },
      {
        name: 'Deeps',
        expansion: 'Nature Incarnate',
        aspectOf: "Ocean's Hungry Grasp",
      },
      { name: 'Relentless Gaze of the Sun', expansion: 'Nature Incarnate' },
      {
        name: 'River Surges in Sunlight',
        spiritIdentifier: 'RiverSurgesInSunlight',
      },
      {
        name: 'Haven',
        expansion: 'Nature Incarnate',
        aspectOf: 'River Surges in Sunlight',
      },
      {
        name: 'Shadows Flicker Like Flame',
        spiritIdentifier: 'ShadowsFlickerLikeFlame',
      },
      {
        name: 'Dark Fire',
        expansion: 'Nature Incarnate',
        aspectOf: 'Shadows Flicker Like Flame',
      },
      { name: 'Towering Roots of the Jungle', expansion: 'Nature Incarnate' },
      { name: 'Thunderspeaker', spiritIdentifier: 'Thunderspeaker' },
      {
        name: 'Tactician',
        expansion: 'Nature Incarnate',
        aspectOf: 'Thunderspeaker',
      },
      {
        name: 'Warrior',
        expansion: 'Nature Incarnate',
        aspectOf: 'Thunderspeaker',
      },
      {
        name: 'Vital Strength of the Earth',
        spiritIdentifier: 'VitalStrengthOfTheEarth',
      },
      {
        name: 'Nourishing',
        expansion: 'Nature Incarnate',
        aspectOf: 'Vital Strength of the Earth',
      },
      { name: 'Wandering Voice Keens Delirium', expansion: 'Nature Incarnate' },
      { name: 'Wounded Waters Bleeding', expansion: 'Nature Incarnate' },
    ]);
  });

  it('returns spirits with certain names', () => {
    expect(
      getSpirits({ names: ['A Spread of Rampant Green', 'Dark Fire'] })
    ).toStrictEqual([
      {
        name: 'A Spread of Rampant Green',
        spiritIdentifier: 'ASpreadOfRampantGreen',
      },
      {
        name: 'Dark Fire',
        expansion: 'Nature Incarnate',
        aspectOf: 'Shadows Flicker Like Flame',
      },
    ]);
  });
});

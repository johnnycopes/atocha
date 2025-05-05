import { groupSpirits } from './group-spirits';
import { getNames } from './get-names';
import { getSpirits } from './get-spirits';

describe('groupSpirits', () => {
  it('returns static spirits sorted into General group', () => {
    expect(
      groupSpirits(['Fractured Days Split the Sky', 'Many Minds Move as One'])
    ).toStrictEqual({
      General: [
        {
          name: 'Fractured Days Split the Sky',
          expansion: 'Jagged Earth',
          spiritIdentifier: 'FracturedDaysSplitTheSky',
        },
        {
          name: 'Many Minds Move as One',
          expansion: 'Jagged Earth',
          spiritIdentifier: 'ManyMindsMoveAsOne',
        },
      ],
      'A Spread of Rampant Green': [],
      'Bringer of Dreams and Nightmares': [],
      'Heart of the Wildfire': [],
      'Keeper of the Forbidden Wilds': [],
      "Lightning's Swift Strike": [],
      'Lure of the Deep Wilderness': [],
      "Ocean's Hungry Grasp": [],
      'River Surges in Sunlight': [],
      'Serpent Slumbering Beneath the Island': [],
      'Shadows Flicker Like Flame': [],
      'Sharp Fangs Behind the Leaves': [],
      'Shifting Memory of Ages': [],
      'Shroud of Silent Mist': [],
      Thunderspeaker: [],
      'Vital Strength of the Earth': [],
    });
  });

  it('returns variable spirits sorted into associated groups', () => {
    expect(
      groupSpirits(["Lightning's Swift Strike", 'Immense', 'Pandemonium'])
    ).toStrictEqual({
      General: [],
      'A Spread of Rampant Green': [],
      'Bringer of Dreams and Nightmares': [],
      'Heart of the Wildfire': [],
      'Keeper of the Forbidden Wilds': [],
      "Lightning's Swift Strike": [
        {
          name: "Lightning's Swift Strike",
          spiritIdentifier: 'LightningsSwiftStrike',
        },
        {
          aspectOf: "Lightning's Swift Strike",
          expansion: 'Promo Pack 2',
          name: 'Immense',
        },
        {
          aspectOf: "Lightning's Swift Strike",
          expansion: 'Jagged Earth',
          name: 'Pandemonium',
          aspectIdentifier: 'Pandemonium',
          spiritIdentifier: 'LightningsSwiftStrike',
        },
      ],
      'Lure of the Deep Wilderness': [],
      "Ocean's Hungry Grasp": [],
      'River Surges in Sunlight': [],
      'Serpent Slumbering Beneath the Island': [],
      'Shadows Flicker Like Flame': [],
      'Sharp Fangs Behind the Leaves': [],
      'Shifting Memory of Ages': [],
      'Shroud of Silent Mist': [],
      Thunderspeaker: [],
      'Vital Strength of the Earth': [],
    });
  });

  it('returns all possible spirits sorted into correct groups', () => {
    expect(groupSpirits(getNames(getSpirits()))).toStrictEqual({
      'A Spread of Rampant Green': [
        {
          name: 'A Spread of Rampant Green',
          spiritIdentifier: 'ASpreadOfRampantGreen',
        },
        {
          aspectOf: 'A Spread of Rampant Green',
          expansion: 'Nature Incarnate',
          name: 'Regrowth',
        },
        {
          aspectOf: 'A Spread of Rampant Green',
          expansion: 'Nature Incarnate',
          name: 'Tangles',
        },
      ],
      'Bringer of Dreams and Nightmares': [
        {
          name: 'Bringer of Dreams and Nightmares',
          spiritIdentifier: 'BringerOfDreamsAndNightmares',
        },
        {
          aspectOf: 'Bringer of Dreams and Nightmares',
          expansion: 'Nature Incarnate',
          name: 'Enticing',
        },
        {
          aspectOf: 'Bringer of Dreams and Nightmares',
          expansion: 'Nature Incarnate',
          name: 'Violence',
        },
      ],
      General: [
        {
          expansion: 'Nature Incarnate',
          name: 'Breath of Darkness Down Your Spine',
        },
        {
          expansion: 'Nature Incarnate',
          name: 'Dances Up Earthquakes',
        },
        {
          expansion: 'Horizons',
          name: 'Devouring Teeth Lurk Underfoot',
          spiritIdentifier: 'DevouringTeethLurkUnderfoot',
        },
        {
          expansion: 'Promo Pack 2',
          name: 'Downpour Drenches the World',
        },
        {
          expansion: 'Nature Incarnate',
          name: 'Ember-Eyed Behemoth',
        },
        {
          expansion: 'Horizons',
          name: 'Eyes Watch From the Trees',
          spiritIdentifier: 'EyesWatchFromTheTrees',
        },
        {
          expansion: 'Horizons',
          name: 'Fathomless Mud of the Swamp',
          spiritIdentifier: 'FathomlessMudOfTheSwamp',
        },
        {
          expansion: 'Promo Pack 2',
          name: 'Finder of Paths Unseen',
        },
        {
          expansion: 'Jagged Earth',
          name: 'Fractured Days Split the Sky',
          spiritIdentifier: 'FracturedDaysSplitTheSky',
        },
        {
          expansion: 'Jagged Earth',
          name: 'Grinning Trickster Stirs Up Trouble',
          spiritIdentifier: 'GrinningTricksterStirsUpTrouble',
        },
        {
          expansion: 'Nature Incarnate',
          name: 'Hearth-Vigil',
        },
        {
          expansion: 'Jagged Earth',
          name: 'Many Minds Move as One',
          spiritIdentifier: 'ManyMindsMoveAsOne',
        },
        {
          expansion: 'Nature Incarnate',
          name: 'Relentless Gaze of the Sun',
        },
        {
          expansion: 'Horizons',
          name: 'Rising Heat of Stone and Sand',
          spiritIdentifier: 'RisingHeatOfStoneAndSand',
        },
        {
          expansion: 'Jagged Earth',
          name: 'Starlight Seeks Its Form',
        },
        {
          expansion: 'Jagged Earth',
          name: "Stone's Unyielding Defiance",
          spiritIdentifier: 'StonesUnyieldingDefiance',
        },
        {
          expansion: 'Horizons',
          name: 'Sun-Bright Whirlwind',
          spiritIdentifier: 'SunBrightWhirlwind',
        },
        {
          expansion: 'Nature Incarnate',
          name: 'Towering Roots of the Jungle',
        },
        {
          expansion: 'Jagged Earth',
          name: 'Vengeance as a Burning Plague',
          spiritIdentifier: 'VengeanceAsABurningPlague',
        },
        {
          expansion: 'Jagged Earth',
          name: 'Volcano Looming High',
          spiritIdentifier: 'VolcanoLoomingHigh',
        },
        {
          expansion: 'Nature Incarnate',
          name: 'Wandering Voice Keens Delirium',
        },
        {
          expansion: 'Nature Incarnate',
          name: 'Wounded Waters Bleeding',
        },
      ],
      'Heart of the Wildfire': [
        {
          expansion: 'Promo Pack 1',
          name: 'Heart of the Wildfire',
          spiritIdentifier: 'HeartOfTheWildfire',
        },
        {
          aspectOf: 'Heart of the Wildfire',
          expansion: 'Nature Incarnate',
          name: 'Transforming',
        },
      ],
      'Keeper of the Forbidden Wilds': [
        {
          expansion: 'Branch & Claw',
          name: 'Keeper of the Forbidden Wilds',
          spiritIdentifier: 'KeeperOfTheForbiddenWilds',
        },
        {
          aspectOf: 'Keeper of the Forbidden Wilds',
          expansion: 'Nature Incarnate',
          name: 'Spreading Hostility',
        },
      ],
      "Lightning's Swift Strike": [
        {
          name: "Lightning's Swift Strike",
          spiritIdentifier: 'LightningsSwiftStrike',
        },
        {
          aspectOf: "Lightning's Swift Strike",
          expansion: 'Promo Pack 2',
          name: 'Immense',
        },
        {
          aspectOf: "Lightning's Swift Strike",
          expansion: 'Jagged Earth',
          name: 'Pandemonium',
          spiritIdentifier: 'LightningsSwiftStrike',
          aspectIdentifier: 'Pandemonium',
        },
        {
          aspectOf: "Lightning's Swift Strike",
          expansion: 'Nature Incarnate',
          name: 'Sparking',
        },
        {
          aspectOf: "Lightning's Swift Strike",
          expansion: 'Jagged Earth',
          name: 'Wind',
          spiritIdentifier: 'LightningsSwiftStrike',
          aspectIdentifier: 'Wind',
        },
      ],
      'Lure of the Deep Wilderness': [
        {
          expansion: 'Jagged Earth',
          name: 'Lure of the Deep Wilderness',
          spiritIdentifier: 'LureOfTheDeepWilderness',
        },
        {
          aspectOf: 'Lure of the Deep Wilderness',
          expansion: 'Nature Incarnate',
          name: 'Lair',
        },
      ],
      "Ocean's Hungry Grasp": [
        {
          name: "Ocean's Hungry Grasp",
          spiritIdentifier: 'OceansHungryGrasp',
        },
        {
          aspectOf: "Ocean's Hungry Grasp",
          expansion: 'Nature Incarnate',
          name: 'Deeps',
        },
      ],
      'River Surges in Sunlight': [
        {
          name: 'River Surges in Sunlight',
          spiritIdentifier: 'RiverSurgesInSunlight',
        },
        {
          aspectOf: 'River Surges in Sunlight',
          expansion: 'Nature Incarnate',
          name: 'Haven',
        },
        {
          aspectOf: 'River Surges in Sunlight',
          expansion: 'Jagged Earth',
          name: 'Sunshine',
          spiritIdentifier: 'RiverSurgesInSunlight',
          aspectIdentifier: 'Sunshine',
        },
        {
          aspectOf: 'River Surges in Sunlight',
          expansion: 'Promo Pack 2',
          name: 'Travel',
        },
      ],
      'Serpent Slumbering Beneath the Island': [
        {
          expansion: 'Promo Pack 1',
          name: 'Serpent Slumbering Beneath the Island',
          spiritIdentifier: 'SerpentSlumberingBeneathTheIsland',
        },
        {
          aspectOf: 'Serpent Slumbering Beneath the Island',
          expansion: 'Nature Incarnate',
          name: 'Locus',
        },
      ],
      'Shadows Flicker Like Flame': [
        {
          name: 'Shadows Flicker Like Flame',
          spiritIdentifier: 'ShadowsFlickerLikeFlame',
        },
        {
          aspectOf: 'Shadows Flicker Like Flame',
          expansion: 'Promo Pack 2',
          name: 'Amorphous',
        },
        {
          aspectOf: 'Shadows Flicker Like Flame',
          expansion: 'Nature Incarnate',
          name: 'Dark Fire',
        },
        {
          aspectOf: 'Shadows Flicker Like Flame',
          expansion: 'Promo Pack 2',
          name: 'Foreboding',
        },
        {
          aspectOf: 'Shadows Flicker Like Flame',
          expansion: 'Jagged Earth',
          name: 'Madness',
          spiritIdentifier: 'ShadowsFlickerLikeFlame',
          aspectIdentifier: 'Madness',
        },
        {
          aspectOf: 'Shadows Flicker Like Flame',
          expansion: 'Jagged Earth',
          name: 'Reach',
          spiritIdentifier: 'ShadowsFlickerLikeFlame',
          aspectIdentifier: 'Reach',
        },
      ],
      'Sharp Fangs Behind the Leaves': [
        {
          expansion: 'Branch & Claw',
          name: 'Sharp Fangs Behind the Leaves',
          spiritIdentifier: 'SharpFangsBehindTheLeaves',
        },
        {
          aspectOf: 'Sharp Fangs Behind the Leaves',
          expansion: 'Nature Incarnate',
          name: 'Encircle',
        },
        {
          aspectOf: 'Sharp Fangs Behind the Leaves',
          expansion: 'Nature Incarnate',
          name: 'Unconstrained',
        },
      ],
      'Shifting Memory of Ages': [
        {
          expansion: 'Jagged Earth',
          name: 'Shifting Memory of Ages',
          spiritIdentifier: 'ShiftingMemoryOfAges',
        },
        {
          aspectOf: 'Shifting Memory of Ages',
          expansion: 'Nature Incarnate',
          name: 'Intensity',
        },
        {
          aspectOf: 'Shifting Memory of Ages',
          expansion: 'Nature Incarnate',
          name: 'Mentor',
        },
      ],
      'Shroud of Silent Mist': [
        {
          expansion: 'Jagged Earth',
          name: 'Shroud of Silent Mist',
          spiritIdentifier: 'ShroudOfSilentMist',
        },
        {
          aspectOf: 'Shroud of Silent Mist',
          expansion: 'Nature Incarnate',
          name: 'Stranded',
        },
      ],
      Thunderspeaker: [
        {
          name: 'Thunderspeaker',
          spiritIdentifier: 'Thunderspeaker',
        },
        {
          aspectOf: 'Thunderspeaker',
          expansion: 'Nature Incarnate',
          name: 'Tactician',
        },
        {
          aspectOf: 'Thunderspeaker',
          expansion: 'Nature Incarnate',
          name: 'Warrior',
        },
      ],
      'Vital Strength of the Earth': [
        {
          name: 'Vital Strength of the Earth',
          spiritIdentifier: 'VitalStrengthOfTheEarth',
        },
        {
          aspectOf: 'Vital Strength of the Earth',
          expansion: 'Promo Pack 2',
          name: 'Might',
        },
        {
          aspectOf: 'Vital Strength of the Earth',
          expansion: 'Nature Incarnate',
          name: 'Nourishing',
        },
        {
          aspectOf: 'Vital Strength of the Earth',
          expansion: 'Jagged Earth',
          name: 'Resilience',
          spiritIdentifier: 'VitalStrengthOfTheEarth',
          aspectIdentifier: 'Resilience',
        },
      ],
    });
  });
});

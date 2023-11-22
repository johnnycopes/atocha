import { groupSpirits } from './group-spirits';
import { SPIRITS } from '../game';
import { getNames } from './get-names';

describe('groupSpirits', () => {
  it('returns static spirits sorted into General group', () => {
    expect(
      groupSpirits([
        'Bringer of Dreams and Nightmares',
        'Fractured Days Split the Sky',
        'Many Minds Move as One',
      ])
    ).toEqual({
      General: [
        { name: 'Bringer of Dreams and Nightmares' },
        { name: 'Fractured Days Split the Sky', expansion: 'Jagged Earth' },
        { name: 'Many Minds Move as One', expansion: 'Jagged Earth' },
      ],
      "Lightning's Swift Strike": [],
      'River Surges in Sunlight': [],
      'Shadows Flicker Like Flame': [],
      'Vital Strength of the Earth': [],
    });
  });

  it('returns variable spirits sorted into associated groups', () => {
    expect(
      groupSpirits(["Lightning's Swift Strike", 'Immense', 'Pandemonium'])
    ).toEqual({
      General: [],
      "Lightning's Swift Strike": [
        {
          name: "Lightning's Swift Strike",
        },
        {
          derivesFrom: "Lightning's Swift Strike",
          expansion: 'Promo Pack 2',
          name: 'Immense',
        },
        {
          derivesFrom: "Lightning's Swift Strike",
          expansion: 'Jagged Earth',
          name: 'Pandemonium',
        },
      ],
      'River Surges in Sunlight': [],
      'Shadows Flicker Like Flame': [],
      'Vital Strength of the Earth': [],
    });
  });

  it('returns all possible spirits sorted into correct groups', () => {
    expect(groupSpirits(getNames(SPIRITS))).toEqual({
      General: [
        { name: 'A Spread of Rampant Green' },
        { name: 'Bringer of Dreams and Nightmares' },
        { name: 'Devouring Teeth Lurk Underfoot', expansion: 'Horizons' },
        { name: 'Downpour Drenches the World', expansion: 'Promo Pack 2' },
        { name: 'Eyes Watch From the Trees', expansion: 'Horizons' },
        { name: 'Fathomless Mud of the Swamp', expansion: 'Horizons' },
        { name: 'Finder of Paths Unseen', expansion: 'Promo Pack 2' },
        { name: 'Fractured Days Split the Sky', expansion: 'Jagged Earth' },
        {
          name: 'Grinning Trickster Stirs Up Trouble',
          expansion: 'Jagged Earth',
        },
        { name: 'Heart of the Wildfire', expansion: 'Promo Pack 1' },
        { name: 'Keeper of the Forbidden Wilds', expansion: 'Branch & Claw' },
        { name: 'Lure of the Deep Wilderness', expansion: 'Jagged Earth' },
        { name: 'Many Minds Move as One', expansion: 'Jagged Earth' },
        { name: "Ocean's Hungry Grasp" },
        { name: 'Rising Heat of Stone and Sand', expansion: 'Horizons' },
        {
          name: 'Serpent Slumbering Beneath the Island',
          expansion: 'Promo Pack 1',
        },
        { name: 'Sharp Fangs Behind the Leaves', expansion: 'Branch & Claw' },
        { name: 'Shifting Memory of Ages', expansion: 'Jagged Earth' },
        { name: 'Shroud of Silent Mist', expansion: 'Jagged Earth' },
        { name: 'Sun-Bright Whirlwind', expansion: 'Horizons' },
        { name: 'Starlight Seeks Its Form', expansion: 'Jagged Earth' },
        { name: "Stone's Unyielding Defiance", expansion: 'Jagged Earth' },
        { name: 'Thunderspeaker' },
        { name: 'Vengeance as a Burning Plague', expansion: 'Jagged Earth' },
        { name: 'Volcano Looming High', expansion: 'Jagged Earth' },
      ],
      "Lightning's Swift Strike": [
        { name: "Lightning's Swift Strike" },
        {
          name: 'Immense',
          expansion: 'Promo Pack 2',
          derivesFrom: "Lightning's Swift Strike",
        },
        {
          name: 'Pandemonium',
          expansion: 'Jagged Earth',
          derivesFrom: "Lightning's Swift Strike",
        },
        {
          name: 'Wind',
          expansion: 'Jagged Earth',
          derivesFrom: "Lightning's Swift Strike",
        },
      ],
      'River Surges in Sunlight': [
        { name: 'River Surges in Sunlight' },
        {
          name: 'Sunshine',
          expansion: 'Jagged Earth',
          derivesFrom: 'River Surges in Sunlight',
        },
        {
          name: 'Travel',
          expansion: 'Promo Pack 2',
          derivesFrom: 'River Surges in Sunlight',
        },
      ],
      'Shadows Flicker Like Flame': [
        { name: 'Shadows Flicker Like Flame' },
        {
          name: 'Amorphous',
          expansion: 'Promo Pack 2',
          derivesFrom: 'Shadows Flicker Like Flame',
        },
        {
          name: 'Foreboding',
          expansion: 'Promo Pack 2',
          derivesFrom: 'Shadows Flicker Like Flame',
        },
        {
          name: 'Madness',
          expansion: 'Jagged Earth',
          derivesFrom: 'Shadows Flicker Like Flame',
        },
        {
          name: 'Reach',
          expansion: 'Jagged Earth',
          derivesFrom: 'Shadows Flicker Like Flame',
        },
      ],
      'Vital Strength of the Earth': [
        { name: 'Vital Strength of the Earth' },
        {
          name: 'Might',
          expansion: 'Promo Pack 2',
          derivesFrom: 'Vital Strength of the Earth',
        },
        {
          name: 'Resilience',
          expansion: 'Jagged Earth',
          derivesFrom: 'Vital Strength of the Earth',
        },
      ],
    });
  });
});

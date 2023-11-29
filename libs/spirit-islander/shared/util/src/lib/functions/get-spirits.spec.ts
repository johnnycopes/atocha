import { SPIRITS } from '../data';
import { getSpirits } from './get-spirits';

describe('getSpirits', () => {
  it('returns all spirits if expansions argument is omitted', () => {
    expect(getSpirits()).toEqual(SPIRITS);
  });

  it('returns spirits from base game', () => {
    expect(getSpirits({ expansions: [] })).toEqual([
      { name: 'A Spread of Rampant Green' },
      { name: 'Bringer of Dreams and Nightmares' },
      { name: "Lightning's Swift Strike" },
      { name: "Ocean's Hungry Grasp" },
      { name: 'River Surges in Sunlight' },
      { name: 'Shadows Flicker Like Flame' },
      { name: 'Thunderspeaker' },
      { name: 'Vital Strength of the Earth' },
    ]);
  });

  it('returns spirits from base game plus any specified expansions', () => {
    expect(getSpirits({ expansions: ['Branch & Claw'] })).toEqual([
      { name: 'A Spread of Rampant Green' },
      { name: 'Bringer of Dreams and Nightmares' },
      { name: 'Keeper of the Forbidden Wilds', expansion: 'Branch & Claw' },
      { name: "Lightning's Swift Strike" },
      { name: "Ocean's Hungry Grasp" },
      { name: 'River Surges in Sunlight' },
      { name: 'Shadows Flicker Like Flame' },
      { name: 'Sharp Fangs Behind the Leaves', expansion: 'Branch & Claw' },
      { name: 'Thunderspeaker' },
      { name: 'Vital Strength of the Earth' },
    ]);
  });

  it('returns aspects only if their associated spirit is also returned', () => {
    expect(getSpirits({ expansions: ['Nature Incarnate'] })).toEqual([
      { name: 'A Spread of Rampant Green' },
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
      { name: 'Bringer of Dreams and Nightmares' },
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
      { name: "Lightning's Swift Strike" },
      {
        name: 'Sparking',
        expansion: 'Nature Incarnate',
        aspectOf: "Lightning's Swift Strike",
      },
      { name: "Ocean's Hungry Grasp" },
      {
        name: 'Deeps',
        expansion: 'Nature Incarnate',
        aspectOf: "Ocean's Hungry Grasp",
      },
      { name: 'Relentless Gaze of the Sun', expansion: 'Nature Incarnate' },
      { name: 'River Surges in Sunlight' },
      {
        name: 'Haven',
        expansion: 'Nature Incarnate',
        aspectOf: 'River Surges in Sunlight',
      },
      { name: 'Shadows Flicker Like Flame' },
      {
        name: 'Dark Fire',
        expansion: 'Nature Incarnate',
        aspectOf: 'Shadows Flicker Like Flame',
      },
      { name: 'Towering Roots of the Jungle', expansion: 'Nature Incarnate' },
      { name: 'Thunderspeaker' },
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
      { name: 'Vital Strength of the Earth' },
      {
        name: 'Nourishing',
        expansion: 'Nature Incarnate',
        aspectOf: 'Vital Strength of the Earth',
      },
      { name: 'Wandering Voice Keens Delirium', expansion: 'Nature Incarnate' },
      { name: 'Wounded Waters Bleeding', expansion: 'Nature Incarnate' },
    ]);
  });
});

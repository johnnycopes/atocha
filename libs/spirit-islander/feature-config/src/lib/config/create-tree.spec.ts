import {
  ADVERSARIES,
  Adversary,
  AdversaryLevel,
  BOARDS,
  EXPANSIONS,
  MAPS,
  SCENARIOS,
  SPIRITS,
} from '@atocha/spirit-islander/util';
import { createTree } from './create-tree';

describe('createTree', () => {
  it('generates expansions tree', () => {
    expect(
      createTree({
        root: 'Expansions',
        items: EXPANSIONS,
        getId: (item) => item,
      })
    ).toEqual({
      id: 'Expansions',
      children: [
        { id: 'Branch & Claw' },
        { id: 'Horizons' },
        { id: 'Jagged Earth' },
        { id: 'Promo Pack 1' },
        { id: 'Promo Pack 2' },
      ],
    });
  });

  it('generates spirits tree', () => {
    expect(
      createTree({
        root: 'Spirits',
        items: SPIRITS,
        getId: ({ name }) => name,
      })
    ).toEqual({
      id: 'Spirits',
      children: [
        { id: 'A Spread of Rampant Green' },
        { id: 'Bringer of Dreams and Nightmares' },
        { id: 'Devouring Teeth Lurk Underfoot' },
        { id: 'Downpour Drenches the World' },
        { id: 'Eyes Watch From the Trees' },
        { id: 'Fathomless Mud of the Swamp' },
        { id: 'Finder of Paths Unseen' },
        { id: 'Fractured Days Split the Sky' },
        { id: 'Grinning Trickster Stirs Up Trouble' },
        { id: 'Heart of the Wildfire' },
        { id: 'Keeper of the Forbidden Wilds' },
        { id: "Lightning's Swift Strike" },
        { id: 'Lure of the Deep Wilderness' },
        { id: 'Many Minds Move as One' },
        { id: "Ocean's Hungry Grasp" },
        { id: 'Rising Heat of Stone and Sand' },
        { id: 'River Surges in Sunlight' },
        { id: 'Serpent Slumbering Beneath the Island' },
        { id: 'Shadows Flicker Like Flame' },
        { id: 'Sharp Fangs Behind the Leaves' },
        { id: 'Shifting Memory of Ages' },
        { id: 'Shroud of Silent Mist' },
        { id: 'Sun-Bright Whirlwind' },
        { id: 'Starlight Seeks Its Form' },
        { id: "Stone's Unyielding Defiance" },
        { id: 'Thunderspeaker' },
        { id: 'Vengeance as a Burning Plague' },
        { id: 'Vital Strength of the Earth' },
        { id: 'Volcano Looming High' },
      ],
    });
  });

  it('generates maps tree', () => {
    expect(
      createTree({
        root: 'Maps',
        items: MAPS,
        getId: ({ name }) => name,
      })
    ).toEqual({
      id: 'Maps',
      children: [{ id: 'Balanced' }, { id: 'Thematic' }],
    });
  });

  it('generates boards tree', () => {
    expect(
      createTree({
        root: 'Boards',
        items: BOARDS,
        getId: ({ name }) => name,
      })
    ).toEqual({
      id: 'Boards',
      children: [
        { id: 'A' },
        { id: 'B' },
        { id: 'C' },
        { id: 'D' },
        { id: 'E' },
        { id: 'F' },
      ],
    });
  });

  it('generates scenarios tree', () => {
    expect(
      createTree({
        root: 'Scenarios',
        items: SCENARIOS,
        getId: ({ name }) => name,
      })
    ).toEqual({
      id: 'Scenarios',
      children: [
        { id: 'No Scenario' },
        { id: 'Blitz' },
        { id: "Guard the Isle's Heart" },
        { id: 'Second Wave' },
        { id: 'A Diversity of Spirits' },
        { id: 'Powers Long Forgotten' },
        { id: 'Elemental Invocation' },
        { id: 'Varied Terrains' },
        { id: 'Despicable Theft' },
        { id: 'Ward the Shores' },
        { id: 'Rituals of Destroying Flame' },
        { id: 'Rituals of Terror' },
        { id: 'The Great River' },
        { id: 'Dahan Insurrection' },
      ],
    });
  });

  it('generates adversaries tree', () => {
    expect(
      createTree<Adversary | AdversaryLevel>({
        root: 'Adversaries',
        items: ADVERSARIES,
        getId: (adversaryOrAdversaryLevel) =>
          'id' in adversaryOrAdversaryLevel
            ? adversaryOrAdversaryLevel.id
            : adversaryOrAdversaryLevel.name,
        getChildren: (adversaryOrAdversaryLevel) =>
          'levels' in adversaryOrAdversaryLevel
            ? adversaryOrAdversaryLevel.levels
            : [],
      })
    ).toEqual({
      id: 'Adversaries',
      children: [
        { id: 'No Adversary' },
        {
          id: 'Brandenburg-Prussia',
          children: [
            { id: 'bp-0' },
            { id: 'bp-1' },
            { id: 'bp-2' },
            { id: 'bp-3' },
            { id: 'bp-4' },
            { id: 'bp-5' },
            { id: 'bp-6' },
          ],
        },
        {
          id: 'England',
          children: [
            { id: 'en-0' },
            { id: 'en-1' },
            { id: 'en-2' },
            { id: 'en-3' },
            { id: 'en-4' },
            { id: 'en-5' },
            { id: 'en-6' },
          ],
        },
        {
          id: 'France',
          children: [
            { id: 'fr-0' },
            { id: 'fr-1' },
            { id: 'fr-2' },
            { id: 'fr-3' },
            { id: 'fr-4' },
            { id: 'fr-5' },
            { id: 'fr-6' },
          ],
        },
        {
          id: 'Habsburg Monarchy',
          children: [
            { id: 'hm-0' },
            { id: 'hm-1' },
            { id: 'hm-2' },
            { id: 'hm-3' },
            { id: 'hm-4' },
            { id: 'hm-5' },
            { id: 'hm-6' },
          ],
        },
        {
          id: 'Russia',
          children: [
            { id: 'ru-0' },
            { id: 'ru-1' },
            { id: 'ru-2' },
            { id: 'ru-3' },
            { id: 'ru-4' },
            { id: 'ru-5' },
            { id: 'ru-6' },
          ],
        },
        {
          id: 'Scotland',
          children: [
            { id: 'sc-0' },
            { id: 'sc-1' },
            { id: 'sc-2' },
            { id: 'sc-3' },
            { id: 'sc-4' },
            { id: 'sc-5' },
            { id: 'sc-6' },
          ],
        },
        {
          id: 'Sweden',
          children: [
            { id: 'sw-0' },
            { id: 'sw-1' },
            { id: 'sw-2' },
            { id: 'sw-3' },
            { id: 'sw-4' },
            { id: 'sw-5' },
            { id: 'sw-6' },
          ],
        },
      ],
    });
  });
});

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
        getData: ({ expansion }) => (expansion ? { expansion } : {}),
      })
    ).toEqual({
      id: 'Spirits',
      children: [
        { id: 'A Spread of Rampant Green' },
        { id: 'Bringer of Dreams and Nightmares' },
        {
          id: 'Devouring Teeth Lurk Underfoot',
          expansion: 'Horizons',
        },
        {
          id: 'Downpour Drenches the World',
          expansion: 'Promo Pack 2',
        },
        {
          id: 'Eyes Watch From the Trees',
          expansion: 'Horizons',
        },
        {
          id: 'Fathomless Mud of the Swamp',
          expansion: 'Horizons',
        },
        {
          id: 'Finder of Paths Unseen',
          expansion: 'Promo Pack 2',
        },
        {
          id: 'Fractured Days Split the Sky',
          expansion: 'Jagged Earth',
        },
        {
          id: 'Grinning Trickster Stirs Up Trouble',
          expansion: 'Jagged Earth',
        },
        {
          id: 'Heart of the Wildfire',
          expansion: 'Promo Pack 1',
        },
        {
          id: 'Keeper of the Forbidden Wilds',
          expansion: 'Branch & Claw',
        },
        { id: "Lightning's Swift Strike" },
        {
          id: 'Lure of the Deep Wilderness',
          expansion: 'Jagged Earth',
        },
        {
          id: 'Many Minds Move as One',
          expansion: 'Jagged Earth',
        },
        { id: "Ocean's Hungry Grasp" },
        {
          id: 'Rising Heat of Stone and Sand',
          expansion: 'Horizons',
        },
        { id: 'River Surges in Sunlight' },
        {
          id: 'Serpent Slumbering Beneath the Island',
          expansion: 'Promo Pack 1',
        },
        { id: 'Shadows Flicker Like Flame' },
        {
          id: 'Sharp Fangs Behind the Leaves',
          expansion: 'Branch & Claw',
        },
        {
          id: 'Shifting Memory of Ages',
          expansion: 'Jagged Earth',
        },
        {
          id: 'Shroud of Silent Mist',
          expansion: 'Jagged Earth',
        },
        {
          id: 'Sun-Bright Whirlwind',
          expansion: 'Horizons',
        },
        {
          id: 'Starlight Seeks Its Form',
          expansion: 'Jagged Earth',
        },
        {
          id: "Stone's Unyielding Defiance",
          expansion: 'Jagged Earth',
        },
        { id: 'Thunderspeaker' },
        {
          id: 'Vengeance as a Burning Plague',
          expansion: 'Jagged Earth',
        },
        { id: 'Vital Strength of the Earth' },
        {
          id: 'Volcano Looming High',
          expansion: 'Jagged Earth',
        },
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
        getData: ({ expansion }) => (expansion ? { expansion } : {}),
      })
    ).toEqual({
      id: 'Boards',
      children: [
        { id: 'A' },
        { id: 'B' },
        { id: 'C' },
        { id: 'D' },
        { id: 'E', expansion: 'Jagged Earth' },
        { id: 'F', expansion: 'Jagged Earth' },
      ],
    });
  });

  it('generates scenarios tree', () => {
    expect(
      createTree({
        root: 'Scenarios',
        items: SCENARIOS,
        getId: ({ name }) => name,
        getData: ({ difficulty }) => ({ difficulty }),
      })
    ).toEqual({
      id: 'Scenarios',
      children: [
        {
          id: 'No Scenario',
          difficulty: 0,
        },
        {
          id: 'Blitz',
          difficulty: 0,
        },
        {
          id: "Guard the Isle's Heart",
          difficulty: 0,
        },
        {
          id: 'Second Wave',
          difficulty: 0,
        },
        {
          id: 'A Diversity of Spirits',
          difficulty: 0,
        },
        {
          id: 'Powers Long Forgotten',
          difficulty: 1,
        },
        {
          id: 'Elemental Invocation',
          difficulty: 0,
        },
        {
          id: 'Varied Terrains',
          difficulty: 2,
        },
        {
          id: 'Despicable Theft',
          difficulty: 2,
        },
        {
          id: 'Ward the Shores',
          difficulty: 2,
        },
        {
          id: 'Rituals of Destroying Flame',
          difficulty: 3,
        },
        {
          id: 'Rituals of Terror',
          difficulty: 3,
        },
        {
          id: 'The Great River',
          difficulty: 3,
        },
        {
          id: 'Dahan Insurrection',
          difficulty: 4,
        },
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
        getData: (adversaryOrAdversaryLevel) =>
          'id' in adversaryOrAdversaryLevel
            ? { difficulty: adversaryOrAdversaryLevel.difficulty }
            : adversaryOrAdversaryLevel.expansion
            ? { expansion: adversaryOrAdversaryLevel.expansion }
            : {},
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
          expansion: 'Branch & Claw',
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
          expansion: 'Jagged Earth',
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
          expansion: 'Jagged Earth',
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
          expansion: 'Promo Pack 2',
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

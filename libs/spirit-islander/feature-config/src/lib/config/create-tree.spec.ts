import { ExpansionName } from '@atocha/spirit-islander/util';
import {
  createAdversariesTree,
  createBoardsTree,
  createExpansionsTree,
  createMapsTree,
  createScenariosTree,
  createSpiritsTree,
} from './create-tree';

describe('createTree', () => {
  let expansions: ExpansionName[] = [];

  beforeEach(() => {
    expansions = [
      'Horizons',
      'Jagged Earth',
      'Branch & Claw',
      'Promo Pack 1',
      'Promo Pack 2',
    ];
  });

  it('generates expansions tree', () => {
    expect(createExpansionsTree()).toEqual({
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
    expect(createSpiritsTree(expansions)).toEqual({
      id: 'Spirits',
      children: [
        { id: 'A Spread of Rampant Green' },
        { id: 'Bringer of Dreams and Nightmares' },
        {
          id: 'Devouring Teeth Lurk Underfoot',
          display: {
            expansion: 'Horizons',
          },
        },
        {
          id: 'Downpour Drenches the World',
          display: {
            expansion: 'Promo Pack 2',
          },
        },
        {
          id: 'Eyes Watch From the Trees',
          display: {
            expansion: 'Horizons',
          },
        },
        {
          id: 'Fathomless Mud of the Swamp',
          display: {
            expansion: 'Horizons',
          },
        },
        {
          id: 'Finder of Paths Unseen',
          display: {
            expansion: 'Promo Pack 2',
          },
        },
        {
          id: 'Fractured Days Split the Sky',
          display: {
            expansion: 'Jagged Earth',
          },
        },
        {
          id: 'Grinning Trickster Stirs Up Trouble',
          display: {
            expansion: 'Jagged Earth',
          },
        },
        {
          id: 'Heart of the Wildfire',
          display: {
            expansion: 'Promo Pack 1',
          },
        },
        {
          id: 'Keeper of the Forbidden Wilds',
          display: {
            expansion: 'Branch & Claw',
          },
        },
        { id: "Lightning's Swift Strike" },
        {
          id: 'Lure of the Deep Wilderness',
          display: {
            expansion: 'Jagged Earth',
          },
        },
        {
          id: 'Many Minds Move as One',
          display: {
            expansion: 'Jagged Earth',
          },
        },
        { id: "Ocean's Hungry Grasp" },
        {
          id: 'Rising Heat of Stone and Sand',
          display: {
            expansion: 'Horizons',
          },
        },
        { id: 'River Surges in Sunlight' },
        {
          id: 'Serpent Slumbering Beneath the Island',
          display: {
            expansion: 'Promo Pack 1',
          },
        },
        { id: 'Shadows Flicker Like Flame' },
        {
          id: 'Sharp Fangs Behind the Leaves',
          display: {
            expansion: 'Branch & Claw',
          },
        },
        {
          id: 'Shifting Memory of Ages',
          display: {
            expansion: 'Jagged Earth',
          },
        },
        {
          id: 'Shroud of Silent Mist',
          display: {
            expansion: 'Jagged Earth',
          },
        },
        {
          id: 'Sun-Bright Whirlwind',
          display: {
            expansion: 'Horizons',
          },
        },
        {
          id: 'Starlight Seeks Its Form',
          display: {
            expansion: 'Jagged Earth',
          },
        },
        {
          id: "Stone's Unyielding Defiance",
          display: {
            expansion: 'Jagged Earth',
          },
        },
        { id: 'Thunderspeaker' },
        {
          id: 'Vengeance as a Burning Plague',
          display: {
            expansion: 'Jagged Earth',
          },
        },
        { id: 'Vital Strength of the Earth' },
        {
          id: 'Volcano Looming High',
          display: {
            expansion: 'Jagged Earth',
          },
        },
      ],
    });
  });

  it('generates maps tree', () => {
    expect(createMapsTree(expansions)).toEqual({
      id: 'Maps',
      children: [
        { id: 'Balanced', display: { difficulty: 0 } },
        { id: 'Thematic', display: { difficulty: 1 } },
      ],
    });
  });

  it('generates boards tree', () => {
    expect(createBoardsTree(expansions)).toEqual({
      id: 'Boards',
      children: [
        { id: 'A' },
        { id: 'B' },
        { id: 'C' },
        { id: 'D' },
        { id: 'E', display: { expansion: 'Jagged Earth' } },
        { id: 'F', display: { expansion: 'Jagged Earth' } },
      ],
    });
  });

  it('generates scenarios tree', () => {
    expect(createScenariosTree(expansions)).toEqual({
      id: 'Scenarios',
      children: [
        {
          id: 'No Scenario',
          display: {
            difficulty: 0,
          },
        },
        {
          id: 'Blitz',
          display: {
            difficulty: 0,
          },
        },
        {
          id: "Guard the Isle's Heart",
          display: {
            difficulty: 0,
          },
        },
        {
          id: 'Second Wave',
          display: {
            difficulty: 0,
            expansion: 'Branch & Claw',
          },
        },
        {
          id: 'A Diversity of Spirits',
          display: {
            difficulty: 0,
            expansion: 'Promo Pack 2',
          },
        },
        {
          id: 'Powers Long Forgotten',
          display: {
            difficulty: 1,
            expansion: 'Branch & Claw',
          },
        },
        {
          id: 'Elemental Invocation',
          display: {
            difficulty: 0,
            expansion: 'Jagged Earth',
          },
        },
        {
          id: 'Varied Terrains',
          display: {
            difficulty: 2,
            expansion: 'Promo Pack 2',
          },
        },
        {
          id: 'Despicable Theft',
          display: {
            difficulty: 2,
            expansion: 'Jagged Earth',
          },
        },
        {
          id: 'Ward the Shores',
          display: {
            difficulty: 2,
            expansion: 'Branch & Claw',
          },
        },
        {
          id: 'Rituals of Destroying Flame',
          display: {
            difficulty: 3,
            expansion: 'Branch & Claw',
          },
        },
        {
          id: 'Rituals of Terror',
          display: {
            difficulty: 3,
          },
        },
        {
          id: 'The Great River',
          display: {
            difficulty: 3,
            expansion: 'Jagged Earth',
          },
        },
        {
          id: 'Dahan Insurrection',
          display: {
            difficulty: 4,
          },
        },
      ],
    });
  });

  it('generates adversaries tree', () => {
    expect(createAdversariesTree(expansions)).toEqual({
      id: 'Adversaries',
      children: [
        { id: 'No Adversary' },
        {
          id: 'Brandenburg-Prussia',
          children: [
            { id: 'bp-0', display: { name: 'Level 0', difficulty: 1 } },
            { id: 'bp-1', display: { name: 'Level 1', difficulty: 2 } },
            { id: 'bp-2', display: { name: 'Level 2', difficulty: 4 } },
            { id: 'bp-3', display: { name: 'Level 3', difficulty: 6 } },
            { id: 'bp-4', display: { name: 'Level 4', difficulty: 7 } },
            { id: 'bp-5', display: { name: 'Level 5', difficulty: 9 } },
            { id: 'bp-6', display: { name: 'Level 6', difficulty: 10 } },
          ],
        },
        {
          id: 'England',
          children: [
            { id: 'en-0', display: { name: 'Level 0', difficulty: 1 } },
            { id: 'en-1', display: { name: 'Level 1', difficulty: 3 } },
            { id: 'en-2', display: { name: 'Level 2', difficulty: 4 } },
            { id: 'en-3', display: { name: 'Level 3', difficulty: 6 } },
            { id: 'en-4', display: { name: 'Level 4', difficulty: 7 } },
            { id: 'en-5', display: { name: 'Level 5', difficulty: 9 } },
            { id: 'en-6', display: { name: 'Level 6', difficulty: 11 } },
          ],
        },
        {
          id: 'France',
          display: { expansion: 'Branch & Claw' },
          children: [
            { id: 'fr-0', display: { name: 'Level 0', difficulty: 2 } },
            { id: 'fr-1', display: { name: 'Level 1', difficulty: 3 } },
            { id: 'fr-2', display: { name: 'Level 2', difficulty: 5 } },
            { id: 'fr-3', display: { name: 'Level 3', difficulty: 7 } },
            { id: 'fr-4', display: { name: 'Level 4', difficulty: 8 } },
            { id: 'fr-5', display: { name: 'Level 5', difficulty: 9 } },
            { id: 'fr-6', display: { name: 'Level 6', difficulty: 10 } },
          ],
        },
        {
          id: 'Habsburg Monarchy',
          display: { expansion: 'Jagged Earth' },
          children: [
            { id: 'hm-0', display: { name: 'Level 0', difficulty: 2 } },
            { id: 'hm-1', display: { name: 'Level 1', difficulty: 3 } },
            { id: 'hm-2', display: { name: 'Level 2', difficulty: 5 } },
            { id: 'hm-3', display: { name: 'Level 3', difficulty: 6 } },
            { id: 'hm-4', display: { name: 'Level 4', difficulty: 8 } },
            { id: 'hm-5', display: { name: 'Level 5', difficulty: 9 } },
            { id: 'hm-6', display: { name: 'Level 6', difficulty: 10 } },
          ],
        },
        {
          id: 'Russia',
          display: { expansion: 'Jagged Earth' },
          children: [
            { id: 'ru-0', display: { name: 'Level 0', difficulty: 1 } },
            { id: 'ru-1', display: { name: 'Level 1', difficulty: 3 } },
            { id: 'ru-2', display: { name: 'Level 2', difficulty: 4 } },
            { id: 'ru-3', display: { name: 'Level 3', difficulty: 6 } },
            { id: 'ru-4', display: { name: 'Level 4', difficulty: 7 } },
            { id: 'ru-5', display: { name: 'Level 5', difficulty: 9 } },
            { id: 'ru-6', display: { name: 'Level 6', difficulty: 11 } },
          ],
        },
        {
          id: 'Scotland',
          display: { expansion: 'Promo Pack 2' },
          children: [
            { id: 'sc-0', display: { name: 'Level 0', difficulty: 1 } },
            { id: 'sc-1', display: { name: 'Level 1', difficulty: 3 } },
            { id: 'sc-2', display: { name: 'Level 2', difficulty: 4 } },
            { id: 'sc-3', display: { name: 'Level 3', difficulty: 6 } },
            { id: 'sc-4', display: { name: 'Level 4', difficulty: 7 } },
            { id: 'sc-5', display: { name: 'Level 5', difficulty: 8 } },
            { id: 'sc-6', display: { name: 'Level 6', difficulty: 10 } },
          ],
        },
        {
          id: 'Sweden',
          children: [
            { id: 'sw-0', display: { name: 'Level 0', difficulty: 1 } },
            { id: 'sw-1', display: { name: 'Level 1', difficulty: 2 } },
            { id: 'sw-2', display: { name: 'Level 2', difficulty: 3 } },
            { id: 'sw-3', display: { name: 'Level 3', difficulty: 5 } },
            { id: 'sw-4', display: { name: 'Level 4', difficulty: 6 } },
            { id: 'sw-5', display: { name: 'Level 5', difficulty: 7 } },
            { id: 'sw-6', display: { name: 'Level 6', difficulty: 8 } },
          ],
        },
      ],
    });
  });
});

import {
  createAdversariesTree,
  createBoardsTree,
  createExpansionsTree,
  createMapsTree,
  createScenariosTree,
  createSpiritsTree,
} from './create-tree';

describe('createTree', () => {
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
    expect(createSpiritsTree()).toEqual({
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
    expect(createMapsTree()).toEqual({
      id: 'Maps',
      children: [
        { id: 'Balanced', difficulty: 0 },
        { id: 'Thematic', difficulty: 3 },
      ],
    });
  });

  it('generates boards tree', () => {
    expect(createBoardsTree()).toEqual({
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
    expect(createScenariosTree()).toEqual({
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
          expansion: 'Branch & Claw',
        },
        {
          id: 'A Diversity of Spirits',
          difficulty: 0,
          expansion: 'Promo Pack 2',
        },
        {
          id: 'Powers Long Forgotten',
          difficulty: 1,
          expansion: 'Branch & Claw',
        },
        {
          id: 'Elemental Invocation',
          difficulty: 0,
          expansion: 'Jagged Earth',
        },
        {
          id: 'Varied Terrains',
          difficulty: 2,
          expansion: 'Promo Pack 2',
        },
        {
          id: 'Despicable Theft',
          difficulty: 2,
          expansion: 'Jagged Earth',
        },
        {
          id: 'Ward the Shores',
          difficulty: 2,
          expansion: 'Branch & Claw',
        },
        {
          id: 'Rituals of Destroying Flame',
          difficulty: 3,
          expansion: 'Branch & Claw',
        },
        {
          id: 'Rituals of Terror',
          difficulty: 3,
        },
        {
          id: 'The Great River',
          difficulty: 3,
          expansion: 'Jagged Earth',
        },
        {
          id: 'Dahan Insurrection',
          difficulty: 4,
        },
      ],
    });
  });

  it('generates adversaries tree', () => {
    expect(createAdversariesTree()).toEqual({
      id: 'Adversaries',
      children: [
        { id: 'No Adversary' },
        {
          id: 'Brandenburg-Prussia',
          children: [
            { id: 'bp-0', difficulty: 1 },
            { id: 'bp-1', difficulty: 2 },
            { id: 'bp-2', difficulty: 4 },
            { id: 'bp-3', difficulty: 6 },
            { id: 'bp-4', difficulty: 7 },
            { id: 'bp-5', difficulty: 9 },
            { id: 'bp-6', difficulty: 10 },
          ],
        },
        {
          id: 'England',
          children: [
            { id: 'en-0', difficulty: 1 },
            { id: 'en-1', difficulty: 3 },
            { id: 'en-2', difficulty: 4 },
            { id: 'en-3', difficulty: 6 },
            { id: 'en-4', difficulty: 7 },
            { id: 'en-5', difficulty: 9 },
            { id: 'en-6', difficulty: 11 },
          ],
        },
        {
          id: 'France',
          expansion: 'Branch & Claw',
          children: [
            { id: 'fr-0', difficulty: 2 },
            { id: 'fr-1', difficulty: 3 },
            { id: 'fr-2', difficulty: 5 },
            { id: 'fr-3', difficulty: 7 },
            { id: 'fr-4', difficulty: 8 },
            { id: 'fr-5', difficulty: 9 },
            { id: 'fr-6', difficulty: 10 },
          ],
        },
        {
          id: 'Habsburg Monarchy',
          expansion: 'Jagged Earth',
          children: [
            { id: 'hm-0', difficulty: 2 },
            { id: 'hm-1', difficulty: 3 },
            { id: 'hm-2', difficulty: 5 },
            { id: 'hm-3', difficulty: 6 },
            { id: 'hm-4', difficulty: 8 },
            { id: 'hm-5', difficulty: 9 },
            { id: 'hm-6', difficulty: 10 },
          ],
        },
        {
          id: 'Russia',
          expansion: 'Jagged Earth',
          children: [
            { id: 'ru-0', difficulty: 1 },
            { id: 'ru-1', difficulty: 3 },
            { id: 'ru-2', difficulty: 4 },
            { id: 'ru-3', difficulty: 6 },
            { id: 'ru-4', difficulty: 7 },
            { id: 'ru-5', difficulty: 9 },
            { id: 'ru-6', difficulty: 11 },
          ],
        },
        {
          id: 'Scotland',
          expansion: 'Promo Pack 2',
          children: [
            { id: 'sc-0', difficulty: 1 },
            { id: 'sc-1', difficulty: 3 },
            { id: 'sc-2', difficulty: 4 },
            { id: 'sc-3', difficulty: 6 },
            { id: 'sc-4', difficulty: 7 },
            { id: 'sc-5', difficulty: 8 },
            { id: 'sc-6', difficulty: 10 },
          ],
        },
        {
          id: 'Sweden',
          children: [
            { id: 'sw-0', difficulty: 1 },
            { id: 'sw-1', difficulty: 2 },
            { id: 'sw-2', difficulty: 3 },
            { id: 'sw-3', difficulty: 5 },
            { id: 'sw-4', difficulty: 6 },
            { id: 'sw-5', difficulty: 7 },
            { id: 'sw-6', difficulty: 8 },
          ],
        },
      ],
    });
  });
});

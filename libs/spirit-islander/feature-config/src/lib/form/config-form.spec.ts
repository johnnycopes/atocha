import { Config } from '@atocha/spirit-islander/util';
import { ConfigForm } from './config-form';

describe('ConfigForm', () => {
  let config: Config;

  beforeEach(() => {
    config = {
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
      adversaryLevelIds: ['No Adversary', 'bp-0', 'bp-1', 'bp-2'],
    };
  });

  it('renders', () => {
    expect(new ConfigForm(config)).toBeTruthy();
  });

  it('has value that matches the passed-in model', () => {
    expect(new ConfigForm(config).value).toEqual(config);
  });

  it('exposes observable of selected expansions', (done) => {
    const form = new ConfigForm(config);
    form.expansions$.subscribe((value) => {
      expect(value).toEqual(['Jagged Earth']);
      done();
    });

    form.patchValue({ expansions: ['Jagged Earth'] });
  });

  describe('has errors', () => {
    it('when players outnumber spirits', () => {
      const form = new ConfigForm(config);
      form.patchValue({
        spiritNames: [],
      });

      expect(form.valid).toBe(false);
      expect(form.errors?.['playersOutnumberSpirits']).toBeTruthy();
    });

    it('when players outnumber total boards', () => {
      const form = new ConfigForm(config);
      form.patchValue({
        players: 5,
      });

      expect(form.valid).toBe(false);
      expect(form.errors?.['playersOutnumberTotalBoards']).toBeTruthy();
    });

    it('when players outnumber selected boards', () => {
      const form = new ConfigForm(config);
      form.patchValue({
        boardNames: [],
      });

      expect(form.valid).toBe(false);
      expect(form.errors?.['playersOutnumberSelectedBoards']).toBeTruthy();
    });

    it('when difficulty range is incompatible', () => {
      const form = new ConfigForm(config);
      form.patchValue({
        difficultyRange: [6, 9],
      });

      expect(form.valid).toBe(false);
      expect(form.errors?.['invalidDifficultyRange']).toBeTruthy();
    });

    it('when no maps are selected', () => {
      const form = new ConfigForm(config);
      form.patchValue({
        mapNames: [],
      });

      expect(form.valid).toBe(false);
      expect(form.get('mapNames')?.errors?.['required']).toBeTruthy();
    });

    it('when no scenarios are selected', () => {
      const form = new ConfigForm(config);
      form.patchValue({
        scenarioNames: [],
      });

      expect(form.valid).toBe(false);
      expect(form.get('scenarioNames')?.errors?.['required']).toBeTruthy();
    });

    it('when no adversaries are selected', () => {
      const form = new ConfigForm(config);
      form.patchValue({
        adversaryLevelIds: [],
      });

      expect(form.valid).toBe(false);
      expect(form.get('adversaryLevelIds')?.errors?.['required']).toBeTruthy();
    });
  });

  describe('expansions changes affect models', () => {
    it('when an expansion is clicked once', () => {
      const form = new ConfigForm(config);
      form.updateModels([], 'Branch & Claw');

      const {
        spiritNames,
        mapNames,
        boardNames,
        scenarioNames,
        adversaryLevelIds,
      } = form.value;
      expect(spiritNames).toEqual([
        'A Spread of Rampant Green',
        'Thunderspeaker',
      ]);
      expect(mapNames).toEqual(['Balanced']);
      expect(boardNames).toEqual(['A', 'C', 'D']);
      expect(scenarioNames).toEqual(['No Scenario', 'Blitz']);
      expect(adversaryLevelIds).toEqual([
        'No Adversary',
        'bp-0',
        'bp-1',
        'bp-2',
      ]);
    });

    it('when an expansion is clicked twice', () => {
      const form = new ConfigForm(config);
      form.updateModels([], 'Branch & Claw');
      form.updateModels(['Branch & Claw'], 'Branch & Claw');

      const {
        spiritNames,
        mapNames,
        boardNames,
        scenarioNames,
        adversaryLevelIds,
      } = form.value;
      expect(spiritNames).toEqual([
        'A Spread of Rampant Green',
        'Thunderspeaker',
        'Keeper of the Forbidden Wilds',
        'Sharp Fangs Behind the Leaves',
      ]);
      expect(mapNames).toEqual(['Balanced']);
      expect(boardNames).toEqual(['A', 'C', 'D']);
      expect(scenarioNames).toEqual([
        'No Scenario',
        'Blitz',
        'Second Wave',
        'Powers Long Forgotten',
        'Ward the Shores',
        'Rituals of Destroying Flame',
      ]);
      expect(adversaryLevelIds).toEqual([
        'No Adversary',
        'bp-0',
        'bp-1',
        'bp-2',
        'France',
        'fr-0',
        'fr-1',
        'fr-2',
        'fr-3',
        'fr-4',
        'fr-5',
        'fr-6',
      ]);
    });

    it('when "Expansions" is clicked once', () => {
      const form = new ConfigForm(config);
      form.updateModels(
        [
          'Branch & Claw',
          'Horizons',
          'Jagged Earth',
          'Promo Pack 1',
          'Promo Pack 2',
        ],
        'Expansions'
      );

      const {
        spiritNames,
        mapNames,
        boardNames,
        scenarioNames,
        adversaryLevelIds,
      } = form.value;
      expect(spiritNames).toEqual([
        'A Spread of Rampant Green',
        'Thunderspeaker',
        'Keeper of the Forbidden Wilds',
        'Devouring Teeth Lurk Underfoot',
        'Downpour Drenches the World',
        'Eyes Watch From the Trees',
        'Fathomless Mud of the Swamp',
        'Finder of Paths Unseen',
        'Fractured Days Split the Sky',
        'Grinning Trickster Stirs Up Trouble',
        'Heart of the Wildfire',
        'Lure of the Deep Wilderness',
        'Many Minds Move as One',
        'Rising Heat of Stone and Sand',
        'Serpent Slumbering Beneath the Island',
        'Sharp Fangs Behind the Leaves',
        'Shifting Memory of Ages',
        'Shroud of Silent Mist',
        'Sun-Bright Whirlwind',
        'Starlight Seeks Its Form',
        "Stone's Unyielding Defiance",
        'Vengeance as a Burning Plague',
        'Volcano Looming High',
      ]);
      expect(mapNames).toEqual(['Balanced']);
      expect(boardNames).toEqual(['A', 'C', 'D', 'E', 'F']);
      expect(scenarioNames).toEqual([
        'No Scenario',
        'Blitz',
        'Second Wave',
        'A Diversity of Spirits',
        'Powers Long Forgotten',
        'Elemental Invocation',
        'Varied Terrains',
        'Despicable Theft',
        'Ward the Shores',
        'Rituals of Destroying Flame',
        'The Great River',
      ]);
      expect(adversaryLevelIds).toEqual([
        'No Adversary',
        'bp-0',
        'bp-1',
        'bp-2',
        'France',
        'fr-0',
        'fr-1',
        'fr-2',
        'fr-3',
        'fr-4',
        'fr-5',
        'fr-6',
        'Habsburg Monarchy',
        'hm-0',
        'hm-1',
        'hm-2',
        'hm-3',
        'hm-4',
        'hm-5',
        'hm-6',
        'Russia',
        'ru-0',
        'ru-1',
        'ru-2',
        'ru-3',
        'ru-4',
        'ru-5',
        'ru-6',
        'Scotland',
        'sc-0',
        'sc-1',
        'sc-2',
        'sc-3',
        'sc-4',
        'sc-5',
        'sc-6',
      ]);
    });

    it('when "Expansions" is clicked twice', () => {
      const form = new ConfigForm(config);
      form.updateModels(
        [
          'Branch & Claw',
          'Horizons',
          'Jagged Earth',
          'Promo Pack 1',
          'Promo Pack 2',
        ],
        'Expansions'
      );
      form.updateModels([], 'Expansions');

      const {
        spiritNames,
        mapNames,
        boardNames,
        scenarioNames,
        adversaryLevelIds,
      } = form.value;
      expect(spiritNames).toEqual([
        'A Spread of Rampant Green',
        'Thunderspeaker',
      ]);
      expect(mapNames).toEqual(['Balanced']);
      expect(boardNames).toEqual(['A', 'C', 'D']);
      expect(scenarioNames).toEqual(['No Scenario', 'Blitz']);
      expect(adversaryLevelIds).toEqual([
        'No Adversary',
        'bp-0',
        'bp-1',
        'bp-2',
      ]);
    });
  });
});

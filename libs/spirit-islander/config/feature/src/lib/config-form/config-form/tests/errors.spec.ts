import { Config } from '@atocha/spirit-islander/config/util';
import { ConfigForm } from '../config-form';
import {
  Settings,
  createDefaultSettings,
} from '@atocha/spirit-islander/settings/util';

describe('ConfigForm errors', () => {
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
      adversaryLevelIds: ['none', 'bp-0', 'bp-1', 'bp-2'],
    };
  });

  it('when players outnumber spirits', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      spiritNames: [],
    });

    expect(form.valid).toBe(false);
    expect(form.spiritsError).toBeTruthy();
  });

  it('when players outnumber total boards', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      players: 5,
    });

    expect(form.valid).toBe(false);
    expect(form.playersError).toBeTruthy();
  });

  it('when players outnumber selected boards', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      boardNames: [],
    });

    expect(form.valid).toBe(false);
    expect(form.boardsError).toStrictEqual(
      'At least 2 boards must be selected (must match or exceed player count)'
    );
  });

  it('when restricted board pairings are selected', () => {
    const settings: Settings = {
      ...createDefaultSettings(),
      allowBEAndDFBoards: false,
    };
    const form = new ConfigForm(config, settings);
    form.patchValue({
      expansions: ['Branch & Claw', 'Jagged Earth'],
      players: 2,
      boardNames: ['D', 'F'],
    });

    expect(form.valid).toBe(false);
    expect(form.boardsError).toStrictEqual(
      'Boards B/E and D/F not allowed in a 2 player game'
    );
  });

  it('when difficulty range is incompatible', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      difficultyRange: [6, 9],
    });

    expect(form.valid).toBe(false);
    expect(form.difficultyError).toBeTruthy();
  });

  it('when no maps are selected', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      mapNames: [],
    });

    expect(form.valid).toBe(false);
    expect(form.mapsError).toBeTruthy();
  });

  it('when no scenarios are selected', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      scenarioNames: [],
    });

    expect(form.valid).toBe(false);
    expect(form.scenariosError).toBeTruthy();
  });

  it('when no adversaries are selected', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      adversaryLevelIds: [],
    });

    expect(form.valid).toBe(false);
    expect(form.adversariesError).toBeTruthy();
  });
});

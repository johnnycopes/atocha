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
      adversaryNamesAndIds: ['No Adversary', 'bp-0', 'bp-1', 'bp-2'],
    };
  });

  it('renders', () => {
    expect(new ConfigForm(config)).toBeTruthy();
  });

  it('has value that matches the passed-in model', () => {
    expect(new ConfigForm(config).value).toEqual(config);
  });

  it('has error when players outnumber spirits', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      spiritNames: [],
    });

    expect(form.valid).toBe(false);
    expect(form.errors?.['playersOutnumberSpirits']).toBeTruthy();
  });

  it('has error when players outnumber total boards', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      players: 5,
    });

    expect(form.valid).toBe(false);
    expect(form.errors?.['playersOutnumberTotalBoards']).toBeTruthy();
  });

  it('has error when players outnumber selected boards', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      boardNames: [],
    });

    expect(form.valid).toBe(false);
    expect(form.errors?.['playersOutnumberSelectedBoards']).toBeTruthy();
  });

  it('has error with invalid difficulty range', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      difficultyRange: [6, 9],
    });

    expect(form.valid).toBe(false);
    expect(form.errors?.['invalidDifficultyRange']).toBeTruthy();
  });

  it('has error difficulty range is incompatible', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      difficultyRange: [6, 9],
    });

    expect(form.valid).toBe(false);
    expect(form.errors?.['invalidDifficultyRange']).toBeTruthy();
  });

  it('has error when no maps are selected', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      mapNames: [],
    });

    expect(form.valid).toBe(false);
    expect(form.get('mapNames')?.errors?.['required']).toBeTruthy();
  });

  it('has error when no scenarios are selected', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      scenarioNames: [],
    });

    expect(form.valid).toBe(false);
    expect(form.get('scenarioNames')?.errors?.['required']).toBeTruthy();
  });

  it('has error when no adversaries are selected', () => {
    const form = new ConfigForm(config);
    form.patchValue({
      adversaryNamesAndIds: [],
    });

    expect(form.valid).toBe(false);
    expect(form.get('adversaryNamesAndIds')?.errors?.['required']).toBeTruthy();
  });

  it('exposes observable of selected expansions', (done) => {
    const form = new ConfigForm(config);
    form.expansions$.subscribe((value) => {
      expect(value).toEqual(['Jagged Earth']);
      done();
    });

    form.patchValue({ expansions: ['Jagged Earth'] });
  });
});

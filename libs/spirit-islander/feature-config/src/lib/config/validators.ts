import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { pluralize } from '@atocha/core/util';
import {
  ExpansionName,
  getValidCombos,
  Players,
} from '@atocha/spirit-islander/util';
import { modelToConfig } from './form-model';

export const required: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return Validators.required(control)
    ? {
        required: 'At least 1 option must be selected',
      }
    : null;
};

export const playersOutnumberSpirits: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const players: Players = control.get('players')?.value;
  const numberOfSpirits: number = control.get('spiritNames')?.value.length;

  return players > numberOfSpirits
    ? {
        playersOutnumberSpirits: `At least ${players} ${pluralize(
          players,
          'spirit'
        )} must be selected`,
      }
    : null;
};

export const playersOutnumberTotalBoards: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const expansions: ExpansionName[] = control.get('expansions')?.value;
  const players: Players = control.get('players')?.value;

  return !expansions.includes('Jagged Earth') && players > 4
    ? {
        playersOutnumberTotalBoards:
          'Cannot generate a setup with more than 4 players unless playing with the Jagged Earth expansion',
      }
    : null;
};

export const playersOutnumberSelectedBoards: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const players: Players = control.get('players')?.value;
  const numberOfBoards: number = control.get('boardNames')?.value.length;

  return players > numberOfBoards
    ? {
        playersOutnumberSelectedBoards: `At least ${players} ${pluralize(
          players,
          'board'
        )} must be selected (must match or exceed player count)`,
      }
    : null;
};

export const invalidDifficultyRange: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const config = modelToConfig(control.value);
  const [min, max] = config.difficultyRange;
  let errorMessage = '';

  if (min > max) {
    errorMessage = 'Minimum cannot exceed maximum';
  } else if (!getValidCombos(config).length) {
    errorMessage = `
      Combination of selected maps, adversaries, and scenarios cannot
      generate a setup between difficulty levels ${min} and ${max}
    `;
  }

  return errorMessage ? { invalidDifficultyRange: errorMessage } : null;
};

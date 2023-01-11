import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import {
  ExpansionName,
  getValidCombos,
  Players,
} from '@atocha/spirit-islander/util';
import { modelToConfig } from './form-model';

export const playersOutnumberSpirits: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const players: Players = control.get('players')?.value;
  const numberOfSpirits: number = control.get('spirits')?.value.length;

  return players > numberOfSpirits
    ? {
        playersOutnumberSpirits: true,
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
        playersOutnumberTotalBoards: true,
      }
    : null;
};

export const playersOutnumberSelectedBoards: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const players: Players = control.get('players')?.value;
  const numberOfBoards: number = control.get('boards')?.value.length;

  return players > numberOfBoards
    ? {
        playersOutnumberSelectedBoards: true,
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

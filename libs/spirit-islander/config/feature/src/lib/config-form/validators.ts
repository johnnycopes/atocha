import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { pluralize } from '@atocha/core/util';
import {
  Config,
  countUniqueSpirits,
  getValidCombos,
} from '@atocha/spirit-islander/config/util';
import { Settings } from '@atocha/spirit-islander/settings/util';

export const required: ValidatorFn = (
  control: AbstractControl<string[]>
): ValidationErrors | null => {
  return Validators.required(control)
    ? {
        required: 'At least 1 option must be selected',
      }
    : null;
};

export const playersOutnumberSpirits: ValidatorFn = (
  control: AbstractControl<Config>
): ValidationErrors | null => {
  const players = control.value.players;
  const numberOfSpirits = countUniqueSpirits(control.value.spiritNames);

  return players > numberOfSpirits
    ? {
        playersOutnumberSpirits: `At least ${players} unique ${pluralize(
          players,
          'spirit'
        )} must be selected`,
      }
    : null;
};

export const playersOutnumberTotalBoards: ValidatorFn = (
  control: AbstractControl<Config>
): ValidationErrors | null => {
  const expansions = control.value.expansions;
  const players = control.value.players;

  return !expansions.includes('Jagged Earth') && players > 4
    ? {
        playersOutnumberTotalBoards:
          'Cannot generate a setup with more than 4 players unless playing with the Jagged Earth expansion',
      }
    : null;
};

export const playersOutnumberSelectedBoards: ValidatorFn = (
  control: AbstractControl<Config>
): ValidationErrors | null => {
  const players = control.value.players;
  const numberOfBoards = control.value.boardNames.length;

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
  control: AbstractControl<Config>
): ValidationErrors | null => {
  const config = control.value;
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

export function restrictedBoardPairings(
  allowBEAndDFBoards: Settings['allowBEAndDFBoards']
): ValidatorFn {
  return (control: AbstractControl<Config>): ValidationErrors | null => {
    if (allowBEAndDFBoards || control.value.players !== 2) return null;

    const boards = control.value.boardNames;
    if (boards.length !== 2) return null;

    if (
      (boards.includes('B') && boards.includes('E')) ||
      (boards.includes('D') && boards.includes('F'))
    ) {
      return {
        restrictedBoardPairings:
          'Boards B / E and boards D / F not allowed in a 2 player game',
      };
    }

    return null;
  };
}

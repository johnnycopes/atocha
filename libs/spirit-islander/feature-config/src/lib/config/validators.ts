import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ExpansionName, Players } from '@atocha/spirit-islander/util';

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

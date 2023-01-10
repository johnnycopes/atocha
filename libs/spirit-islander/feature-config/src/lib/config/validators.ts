import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ExpansionName, Players } from '@atocha/spirit-islander/util';

export const playersOutnumberPossibleBoards: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const expansions: ExpansionName[] = control.get('expansions')?.value;
  const players: Players = control.get('players')?.value;

  return !expansions.includes('Jagged Earth') && players > 4
    ? {
        playersOutnumberPossibleBoards: true,
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

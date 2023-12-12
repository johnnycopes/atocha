import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { Config } from '@atocha/spirit-islander/config/util';

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

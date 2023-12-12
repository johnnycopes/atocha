import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { pluralize } from '@atocha/core/util';
import { Config } from '@atocha/spirit-islander/config/util';

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

import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { pluralize } from '@atocha/core/util';
import {
  Config,
  countUniqueSpirits,
} from '@atocha/spirit-islander/config/util';

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

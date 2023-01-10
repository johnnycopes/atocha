import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ExpansionName, Players } from '@atocha/spirit-islander/util';

export const supportsPlayers: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const expansions: AbstractControl<ExpansionName[]> | null =
    control.get('expansions');
  const players: AbstractControl<Players> | null = control.get('players');

  return !expansions?.value.includes('Jagged Earth') &&
    (players?.value ?? 0) > 4
    ? {
        supportsPlayers: true,
      }
    : null;
};

import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { Config } from '@atocha/spirit-islander/config/util';
import { Settings } from '@atocha/spirit-islander/settings/util';

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
          'Boards B/E and D/F not allowed in a 2 player game',
      };
    }

    return null;
  };
}

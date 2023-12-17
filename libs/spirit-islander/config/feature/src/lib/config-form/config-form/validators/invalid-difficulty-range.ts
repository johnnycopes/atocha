import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { Config, getValidCombos } from '@atocha/spirit-islander/config/util';

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

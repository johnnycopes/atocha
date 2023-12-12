import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export const required: ValidatorFn = (
  control: AbstractControl<string[]>
): ValidationErrors | null => {
  return Validators.required(control)
    ? {
        required: 'At least 1 option must be selected',
      }
    : null;
};

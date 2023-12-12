import { FormBuilder } from '@angular/forms';

import { required } from './validators';

describe('required', () => {
  const fbnn = new FormBuilder().nonNullable;

  it('returns an error if control value length is 0', () => {
    expect(required(fbnn.control([] as string[]))).toEqual({
      required: 'At least 1 option must be selected',
    });
  });

  it('returns null if control value length is at least 1', () => {
    expect(required(fbnn.control(['A', 'B']))).toBe(null);
  });
});

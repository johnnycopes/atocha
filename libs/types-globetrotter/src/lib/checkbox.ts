import { Dictionary } from 'lodash';

export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';
export type CheckboxStates = Dictionary<CheckboxState>;

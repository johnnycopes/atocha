import { State } from './types';

export function markChecked(
  target: boolean | undefined,
  initial: State | undefined
): boolean {
  return typeof target === 'boolean' ? target : initial !== 'checked';
}

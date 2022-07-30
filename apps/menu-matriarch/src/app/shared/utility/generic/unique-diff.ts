import { dedupe } from './dedupe';

export function uniqueDiff<T>(initial: T[], final: T[]): {
  added: T[],
  removed: T[],
} {
  const added: T[] = [];
  const removed: T[] = [];
  for (const id of dedupe(initial, final)) {
    if (initial.includes(id) && !final.includes(id)) {
      removed.push(id);
    } else if (!initial.includes(id) && final.includes(id)) {
      added.push(id);
    }
  }
  return { added, removed };
}

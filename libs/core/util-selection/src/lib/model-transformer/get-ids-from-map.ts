import { IdsMap } from './create-ids-map';

export function getIdsFromMap(map: IdsMap): string[] {
  return Array.from(map.keys());
}

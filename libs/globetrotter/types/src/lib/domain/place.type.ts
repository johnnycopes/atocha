import { Region } from './region.interface';
import { Country } from './country.interface';
import { Subregion } from './subregion.interface';

export type Place = Region | Subregion | Country;

export function isRegion(place: Place): place is Region {
  return 'subregions' in place;
}

export function isSubregion(place: Place): place is Subregion {
  return 'countries' in place;
}

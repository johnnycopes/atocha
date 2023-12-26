import { Country } from '@atocha/globetrotter/shared/util';

export type Place = Region | Subregion | Country;

export interface Region {
  name: string;
  subregions: Subregion[];
}

interface Subregion {
  name: string;
  countries: Country[];
}

export function isRegion(place: Place): place is Region {
  return 'subregions' in place;
}

export function isSubregion(place: Place): place is Subregion {
  return 'countries' in place;
}

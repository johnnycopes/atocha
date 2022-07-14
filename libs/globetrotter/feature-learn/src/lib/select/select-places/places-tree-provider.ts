import { Place, Region, Subregion } from '@atocha/globetrotter/types';

export function isRegion(place: Place): place is Region {
  return 'subregions' in place;
}

export function isSubregion(place: Place): place is Subregion {
  return 'countries' in place;
}

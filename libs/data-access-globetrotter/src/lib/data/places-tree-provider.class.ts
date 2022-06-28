import { Dictionary } from 'lodash';

import { TreeProvider } from '@atocha/ui-globetrotter';
import { Place, Region, Subregion } from '@atocha/types-globetrotter';

export class PlacesTreeProvider implements TreeProvider<Place> {
  private _placesById: Dictionary<Place> = {};

  constructor(place: Place) {
    // set placesKeyedById recursively
    const places = [place];
    while (places.length) {
      const currentPlace = places.shift();
      if (currentPlace) {
        const currentPlaceId = this.getId(currentPlace);
        const currentPlaceChildren = this.getChildren(currentPlace);
        this._placesById[currentPlaceId] = currentPlace;
        if (currentPlaceChildren.length) {
          currentPlaceChildren.forEach((child) => {
            places.push(child);
          });
        }
      }
    }
  }

  getId(place: Place): string {
    return place.name;
  }

  getParent(place: Place): Place | undefined {
    if (isSubregion(place)) {
      return this._placesById[place.region];
    }
    return undefined;
  }

  getChildren(place: Place): Place[] {
    if (isRegion(place)) {
      return place.subregions;
    }
    return [];
  }
}

function isRegion(place: Place): place is Region {
  return 'subregions' in place;
}

function isSubregion(place: Place): place is Subregion {
  return 'countries' in place;
}

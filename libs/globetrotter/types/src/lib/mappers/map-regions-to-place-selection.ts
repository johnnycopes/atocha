import { Region } from '../domain/region.interface';
import { PlaceSelection } from '../selection.interface';

export function mapRegionsToPlaceSelection(regions: Region[]): PlaceSelection {
  const placeSelection: PlaceSelection = {};

  for (const { name, subregions } of regions) {
    placeSelection[name] = 'checked';
    for (const { name } of subregions) {
      placeSelection[name] = 'checked';
    }
  }

  return placeSelection;
}

import { PlaceSelection, Region } from "@atocha/globetrotter/types";

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

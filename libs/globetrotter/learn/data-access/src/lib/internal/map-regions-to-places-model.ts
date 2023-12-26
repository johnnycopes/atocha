import { Region } from '@atocha/globetrotter/learn/util';

export function mapRegionsToPlacesModel(regions: Region[]): string[] {
  const placeModel = [];

  for (const { subregions } of regions) {
    for (const { name } of subregions) {
      placeModel.push(name);
    }
  }

  return placeModel;
}

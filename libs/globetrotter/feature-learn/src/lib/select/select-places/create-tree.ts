import { Region } from '@atocha/globetrotter/util';

export interface PlaceTree {
  id: string;
  children: {
    id: string;
    children: {
      id: string;
      countries: number;
      children: [];
    }[];
  }[];
}

export function createTree({
  root,
  regions,
}: {
  root: string;
  regions: Region[];
}): PlaceTree {
  return {
    id: root,
    children: regions.map((region) => ({
      id: region.name,
      children: region.subregions.map((subregion) => ({
        id: subregion.name,
        countries: subregion.countries.length,
        children: [],
      })),
    })),
  };
}

export function getTreeId({ id }: PlaceTree): string {
  return id;
}

export function getTreeChildren({ children }: PlaceTree): PlaceTree[] {
  return children;
}

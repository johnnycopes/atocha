import {
  isRegion,
  isSubregion,
  Place,
  Region,
} from '@atocha/globetrotter/util';

export type PlaceTree = Root | Place;

interface Root {
  name: string;
  regions: Region[];
}

export function createPlaceTree(name: string, regions: Region[]): PlaceTree {
  return {
    name,
    regions,
  };
}

export function getId({ name }: PlaceTree): string {
  return name;
}

export function getChildren(tree: PlaceTree): Place[] {
  if (isRoot(tree)) {
    return tree.regions;
  } else if (isRegion(tree)) {
    return tree.subregions;
  } else {
    return [];
  }
}

export function getNumberOfCountries(tree: PlaceTree): number {
  return !isRoot(tree) && isSubregion(tree) ? tree.countries.length : 0;
}

function isRoot(tree: PlaceTree): tree is Root {
  return 'regions' in tree;
}

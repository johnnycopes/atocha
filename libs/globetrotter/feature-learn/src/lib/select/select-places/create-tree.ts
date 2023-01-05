import {
  isRegion,
  isSubregion,
  Place,
  Region,
} from '@atocha/globetrotter/util';

export interface Root {
  name: string;
  regions: Region[];
}

type PlaceTree = Root | Place;

export function createTree({
  root,
  regions,
}: {
  root: string;
  regions: Region[];
}): PlaceTree {
  return {
    name: root,
    regions,
  };
}

export function getTreeId({ name }: PlaceTree): string {
  return name;
}

export function getChildren(tree: PlaceTree): Place[] {
  if ('regions' in tree) {
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

import {
  isRegion,
  isSubregion,
  Place,
  Region,
} from '@atocha/globetrotter/learn/util';

export interface Root {
  name: string;
  regions: Region[];
}

type Node = Root | Place;

export function createPlaceRoot(name: string, regions: Region[]): Root {
  return {
    name,
    regions,
  };
}

export function getId({ name }: Node): string {
  return name;
}

export function getChildren(node: Node): Place[] {
  if (isRoot(node)) {
    return node.regions;
  } else if (isRegion(node)) {
    return node.subregions;
  } else {
    return [];
  }
}

export function getNumberOfCountries(node: Node): number {
  return !isRoot(node) && isSubregion(node) ? node.countries.length : 0;
}

function isRoot(node: Node): node is Root {
  return 'regions' in node;
}

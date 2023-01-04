import { Place } from '@atocha/globetrotter/util';

export interface PlaceTree {
  id: string;
  display?: Partial<Place>;
  children?: PlaceTree[];
}

export function createTree({
  root,
  items,
  getId,
  getChildren = () => [],
}: {
  root: string;
  items: Place[];
  getId: (item: Place) => string;
  getChildren?: (item: Place) => Place[];
}): PlaceTree {
  return {
    id: root,
    children: items.map((item) => ({
      id: getId(item),
      ...(getChildren(item).length > 0 && {
        children: getChildren(item).map((item) => ({
          id: getId(item),
        })),
      }), // Only include `children` property if children exist
    })),
  };
}

export function getId({ id }: PlaceTree): string {
  return id;
}

export function getChildren({ children }: PlaceTree): PlaceTree[] {
  return children ?? [];
}

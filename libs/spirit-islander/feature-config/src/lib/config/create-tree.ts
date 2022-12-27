export interface ConfigTree<T> {
  id: string;
  children?: ConfigTree<T>[];
}

export function createTree<T>({
  root,
  items,
  getId,
  getChildren = () => [],
}: {
  root: string;
  items: T[];
  getId: (item: T) => string;
  getChildren?: (item: T) => T[];
}): ConfigTree<T> {
  return {
    id: root,
    children: items.map((item) => ({
      id: getId(item),
      ...(getChildren(item).length > 0 && {
        children: getChildren(item).map((item) => ({ id: getId(item) })),
      }), // Only include `children` property if children exist
    })),
  };
}

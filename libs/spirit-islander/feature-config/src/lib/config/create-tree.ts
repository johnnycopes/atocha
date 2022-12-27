export interface ConfigTree<T> {
  id: string;
  children?: ConfigTree<T>[];
}

export function createTree<T>({
  root,
  items,
  getId,
  getData,
  getChildren = () => [],
}: {
  root: string;
  items: T[];
  getId: (item: T) => string;
  getData?: (item: T) => Partial<T>;
  getChildren?: (item: T) => T[];
}): ConfigTree<T> {
  return {
    id: root,
    children: items.map((item) => ({
      id: getId(item),
      ...getData?.(item), // Only include extra properties if specified
      ...(getChildren(item).length > 0 && {
        children: getChildren(item).map((item) => ({ id: getId(item) })),
      }), // Only include `children` property if children exist
    })),
  };
}

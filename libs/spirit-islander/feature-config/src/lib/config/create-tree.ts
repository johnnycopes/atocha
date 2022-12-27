interface Tree<T> {
  id: string;
  children?: Tree<T>[];
}

export function createTree<T>({
  root,
  items,
  getId,
}: {
  root: string;
  items: T[];
  getId: (item: T) => string;
}): Tree<T> {
  return {
    id: root,
    children: items.map((item) => ({ id: getId(item) })),
  };
}

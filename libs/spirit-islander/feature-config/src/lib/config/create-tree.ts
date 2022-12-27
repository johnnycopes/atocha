import {
  ADVERSARIES,
  Adversary,
  AdversaryLevel,
  BOARDS,
  EXPANSIONS,
  MAPS,
  SCENARIOS,
  SPIRITS,
} from '@atocha/spirit-islander/util';

export interface ConfigTree<T> {
  id: string;
  children?: ConfigTree<T>[];
}

export function createExpansionsTree() {
  return createTree({
    root: 'Expansions',
    items: EXPANSIONS,
    getId: (item) => item,
  });
}

export function createSpiritsTree() {
  return createTree({
    root: 'Spirits',
    items: SPIRITS,
    getId: ({ name }) => name,
    getData: ({ expansion }) => (expansion ? { expansion } : {}),
  });
}

export function createMapsTree() {
  return createTree({
    root: 'Maps',
    items: MAPS,
    getId: ({ name }) => name,
  });
}

export function createBoardsTree() {
  return createTree({
    root: 'Boards',
    items: BOARDS,
    getId: ({ name }) => name,
    getData: ({ expansion }) => (expansion ? { expansion } : {}),
  });
}

export function createScenariosTree() {
  return createTree({
    root: 'Scenarios',
    items: SCENARIOS,
    getId: ({ name }) => name,
    getData: ({ difficulty }) => ({ difficulty }),
  });
}

export function createAdversariesTree() {
  return createTree<Adversary | AdversaryLevel>({
    root: 'Adversaries',
    items: ADVERSARIES,
    getId: (adversaryOrAdversaryLevel) =>
      'id' in adversaryOrAdversaryLevel
        ? adversaryOrAdversaryLevel.id
        : adversaryOrAdversaryLevel.name,
    getChildren: (adversaryOrAdversaryLevel) =>
      'levels' in adversaryOrAdversaryLevel
        ? adversaryOrAdversaryLevel.levels
        : [],
    getData: (adversaryOrAdversaryLevel) =>
      'id' in adversaryOrAdversaryLevel
        ? { difficulty: adversaryOrAdversaryLevel.difficulty }
        : adversaryOrAdversaryLevel.expansion
        ? { expansion: adversaryOrAdversaryLevel.expansion }
        : {},
  });
}

function createTree<T>({
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

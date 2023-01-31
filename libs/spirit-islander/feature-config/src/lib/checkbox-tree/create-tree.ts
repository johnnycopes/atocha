import {
  ADVERSARIES,
  Adversary,
  AdversaryLevel,
  AdversaryLevelId,
  AdversaryName,
  BOARDS,
  ExpansionName,
  EXPANSIONS,
  getDifficulty,
  getOptionsByExpansion,
  MAPS,
  SCENARIOS,
  SPIRITS,
} from '@atocha/spirit-islander/util';

export interface ConfigTree<T> {
  id: string;
  display?: Partial<T>;
  children?: ConfigTree<T>[];
}

export function createExpansionsTree() {
  return createTree({
    root: 'Expansions',
    items: EXPANSIONS,
    getId: (item) => item,
  });
}

export function createSpiritsTree(expansions: ExpansionName[]) {
  return createTree({
    root: 'Spirits',
    items: getOptionsByExpansion(SPIRITS, expansions),
    getId: ({ name }) => name,
    getDisplay: ({ expansion }) => (expansion ? { expansion } : {}),
  });
}

export function createMapsTree(expansions: ExpansionName[]) {
  return createTree({
    root: 'Maps',
    items: getOptionsByExpansion(MAPS, expansions),
    getId: ({ name }) => name,
    getDisplay: ({ difficulty }) => ({
      difficulty: getDifficulty(difficulty, expansions),
    }),
  });
}

export function createBoardsTree(expansions: ExpansionName[]) {
  return createTree({
    root: 'Boards',
    items: getOptionsByExpansion(BOARDS, expansions),
    getId: ({ name }) => name,
    getDisplay: ({ expansion }) => (expansion ? { expansion } : {}),
  });
}

export function createScenariosTree(expansions: ExpansionName[]) {
  return createTree({
    root: 'Scenarios',
    items: getOptionsByExpansion(SCENARIOS, expansions),
    getId: ({ name }) => name,
    getDisplay: ({ expansion, difficulty }) => ({
      difficulty,
      ...(expansion && { expansion }),
    }),
  });
}

export function createAdversariesTree(expansions: ExpansionName[]) {
  return createTree<
    Adversary | AdversaryLevel,
    AdversaryName | AdversaryLevelId
  >({
    root: 'Adversaries',
    items: getOptionsByExpansion(ADVERSARIES, expansions),
    getId: (entity) => (isAdversaryLevel(entity) ? entity.id : entity.name),
    getChildren: (entity) => (isAdversary(entity) ? entity.levels : []),
    getDisplay: (entity) => {
      if (isAdversary(entity) && entity.expansion) {
        return { expansion: entity.expansion };
      } else if (isAdversaryLevel(entity)) {
        return { name: entity.name, difficulty: entity.difficulty };
      }
      return {};
    },
  });
}

function isAdversary(entity: Adversary | AdversaryLevel): entity is Adversary {
  return 'levels' in entity;
}

function isAdversaryLevel(
  entity: Adversary | AdversaryLevel
): entity is AdversaryLevel {
  return 'id' in entity;
}

function createTree<T, U extends string>({
  root,
  items,
  getId,
  getDisplay,
  getChildren = () => [],
}: {
  root: string;
  items: readonly T[];
  getId: (item: T) => U;
  getDisplay?: (item: T) => Partial<T>;
  getChildren?: (item: T) => T[];
}): ConfigTree<T> {
  return {
    id: root,
    children: items.map((item) => ({
      id: getId(item),
      ...(getDisplay &&
        Object.keys(getDisplay(item)).length > 0 && {
          display: getDisplay(item),
        }), // Only include display properties if specified
      ...(getChildren(item).length > 0 && {
        children: getChildren(item).map((item) => ({
          id: getId(item),
          ...(getDisplay &&
            Object.keys(getDisplay(item)).length > 0 && {
              display: getDisplay(item),
            }), // Only include display properties if specified
        })),
      }), // Only include `children` property if children exist
    })),
  };
}

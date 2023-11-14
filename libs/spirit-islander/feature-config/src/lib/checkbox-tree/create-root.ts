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

export interface Node<T> {
  id: string;
  display?: Partial<T>;
  children?: Node<T>[];
}

export function createExpansionsRoot() {
  return createRoot({
    root: 'Expansions',
    items: EXPANSIONS,
    getId: (item) => item,
  });
}

export function createSpiritsRoot(expansions: ExpansionName[]) {
  return createRoot({
    root: 'Spirits',
    items: getOptionsByExpansion(SPIRITS, expansions),
    getId: ({ name }) => name,
    getDisplay: ({ expansion }) => (expansion ? { expansion } : {}),
  });
}

export function createMapsRoot(expansions: ExpansionName[]) {
  return createRoot({
    root: 'Maps',
    items: getOptionsByExpansion(MAPS, expansions),
    getId: ({ name }) => name,
    getDisplay: ({ difficulty }) => ({
      difficulty: getDifficulty(difficulty, expansions),
    }),
  });
}

export function createBoardsRoot(expansions: ExpansionName[]) {
  return createRoot({
    root: 'Boards',
    items: getOptionsByExpansion(BOARDS, expansions),
    getId: ({ name }) => name,
    getDisplay: ({ expansion }) => (expansion ? { expansion } : {}),
  });
}

export function createScenariosRoot(expansions: ExpansionName[]) {
  return createRoot({
    root: 'Scenarios',
    items: getOptionsByExpansion(SCENARIOS, expansions),
    getId: ({ name }) => name,
    getDisplay: ({ expansion, difficulty }) => ({
      difficulty,
      ...(expansion && { expansion }),
    }),
  });
}

export function createAdversariesRoot(expansions: ExpansionName[]) {
  return createRoot<
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

function createRoot<T, U extends string>({
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
  getChildren?: (item: T) => readonly T[];
}): Node<T> {
  return {
    id: root,
    children: items.map((item) =>
      createChild(item, getId, getDisplay, getChildren)
    ),
  };
}

function createChild<T, U extends string>(
  item: T,
  getId: (item: T) => U,
  getDisplay?: (item: T) => Partial<T>,
  getChildren?: (item: T) => readonly T[]
): Node<T> {
  const configTree: Node<T> = { id: getId(item) };

  if (getDisplay && Object.keys(getDisplay(item)).length > 0) {
    configTree.display = getDisplay(item);
  }

  if (getChildren && getChildren(item).length > 0) {
    configTree.children = getChildren(item).map((child) =>
      createChild(child, getId, getDisplay, getChildren)
    );
  }

  return configTree;
}

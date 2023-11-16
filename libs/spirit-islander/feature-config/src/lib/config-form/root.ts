import {
  Adversary,
  AdversaryLevel,
  AdversaryLevelId,
  AdversaryName,
  Board,
  ExpansionName,
  Map,
  Options,
  Scenario,
  Spirit,
  getDifficulty,
} from '@atocha/spirit-islander/util';

export interface Node<T> {
  id: string;
  display?: Partial<T>;
  children?: Node<T>[];
}

export class Root {
  readonly expansions = this._createRoot({
    root: 'Expansions',
    items: Options.allExpansions,
    getId: (item) => item,
  });

  private _spirits!: Node<Spirit>;
  get spirits(): Readonly<Node<Spirit>> {
    return this._spirits;
  }

  private _maps!: Node<Map>;
  get maps(): Readonly<Node<Map>> {
    return this._maps;
  }

  private _boards!: Node<Board>;
  get boards(): Readonly<Node<Board>> {
    return this._boards;
  }

  private _scenarios!: Node<Scenario>;
  get scenarios(): Readonly<Node<Scenario>> {
    return this._scenarios;
  }

  private _adversaries!: Node<Adversary | AdversaryLevel>;
  get adversaries(): Readonly<Node<Adversary | AdversaryLevel>> {
    return this._adversaries;
  }

  private readonly _options = new Options();

  constructor(expansions: ExpansionName[] = []) {
    this.update(expansions);
  }

  update(expansions: readonly ExpansionName[]) {
    this._options.update(expansions);

    this._spirits = this._createRoot({
      root: 'Spirits',
      items: this._options.spirits,
      getId: ({ name }) => name,
      getDisplay: ({ expansion }) => (expansion ? { expansion } : {}),
    });

    this._maps = this._createRoot({
      root: 'Maps',
      items: this._options.maps,
      getId: ({ name }) => name,
      getDisplay: ({ difficulty }) => ({
        difficulty: getDifficulty(difficulty, expansions),
      }),
    });

    this._boards = this._createRoot({
      root: 'Boards',
      items: this._options.boards,
      getId: ({ name }) => name,
      getDisplay: ({ expansion }) => (expansion ? { expansion } : {}),
    });

    this._scenarios = this._createRoot({
      root: 'Scenarios',
      items: this._options.scenarios,
      getId: ({ name }) => name,
      getDisplay: ({ expansion, difficulty }) => ({
        difficulty,
        ...(expansion && { expansion }),
      }),
    });

    this._adversaries = this._createRoot<
      Adversary | AdversaryLevel,
      AdversaryName | AdversaryLevelId
    >({
      root: 'Adversaries',
      items: this._options.adversaries,
      getId: (entity) =>
        this._isAdversaryLevel(entity) ? entity.id : entity.name,
      getChildren: (entity) => (this._isAdversary(entity) ? entity.levels : []),
      getDisplay: (entity) => {
        if (this._isAdversary(entity) && entity.expansion) {
          return { expansion: entity.expansion };
        } else if (this._isAdversaryLevel(entity)) {
          return { name: entity.name, difficulty: entity.difficulty };
        }
        return {};
      },
    });
  }

  private _createRoot<T, U extends string>({
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
        this._createChild(item, getId, getDisplay, getChildren)
      ),
    };
  }

  private _createChild<T, U extends string>(
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
        this._createChild(child, getId, getDisplay, getChildren)
      );
    }

    return configTree;
  }

  private _isAdversary(
    entity: Adversary | AdversaryLevel
  ): entity is Adversary {
    return 'levels' in entity;
  }

  private _isAdversaryLevel(
    entity: Adversary | AdversaryLevel
  ): entity is AdversaryLevel {
    return 'id' in entity;
  }
}

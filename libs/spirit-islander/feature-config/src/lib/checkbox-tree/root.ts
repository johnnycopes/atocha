import {
  Adversary,
  AdversaryLevel,
  AdversaryLevelId,
  AdversaryName,
  Board,
  EXPANSIONS,
  ExpansionName,
  Map,
  Options,
  Scenario,
  Spirit,
  getDifficulty,
} from '@atocha/spirit-islander/util';
import { Node, createRoot } from './create-root';

export class Root {
  readonly expansions = createRoot({
    root: 'Expansions',
    items: EXPANSIONS,
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

  private readonly _options = new Options([]);

  constructor(expansions: ExpansionName[]) {
    this.update(expansions);
  }

  update(expansions: ExpansionName[]) {
    this._options.update(expansions);

    this._spirits = createRoot({
      root: 'Spirits',
      items: this._options.spirits,
      getId: ({ name }) => name,
      getDisplay: ({ expansion }) => (expansion ? { expansion } : {}),
    });

    this._maps = createRoot({
      root: 'Maps',
      items: this._options.maps,
      getId: ({ name }) => name,
      getDisplay: ({ difficulty }) => ({
        difficulty: getDifficulty(difficulty, expansions),
      }),
    });

    this._boards = createRoot({
      root: 'Boards',
      items: this._options.boards,
      getId: ({ name }) => name,
      getDisplay: ({ expansion }) => (expansion ? { expansion } : {}),
    });

    this._scenarios = createRoot({
      root: 'Scenarios',
      items: this._options.scenarios,
      getId: ({ name }) => name,
      getDisplay: ({ expansion, difficulty }) => ({
        difficulty,
        ...(expansion && { expansion }),
      }),
    });

    this._adversaries = createRoot<
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

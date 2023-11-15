import { AdversaryLevelId } from './game/adversaries';
import { BalancedBoardName } from './game/boards';
import { ExpansionName } from './game/expansions';
import { MapName } from './game/maps';
import { ScenarioName } from './game/scenarios';
import { SpiritName } from './game/spirits';
import { Options } from './options';

export class Models {
  private readonly _options = new Options();

  constructor(expansions: ExpansionName[] = []) {
    this.update(expansions);
  }

  update(expansions: ExpansionName[]): void {
    this._options.update(expansions);
  }

  createSpiritsModel(): SpiritName[] {
    return this._options.spirits.map(({ name }) => name);
  }

  createMapsModel(): MapName[] {
    return this._options.maps.map(({ name }) => name);
  }

  createBoardsModel(): BalancedBoardName[] {
    return this._options.boards.map(({ name }) => name);
  }

  createScenariosModel(): ScenarioName[] {
    return this._options.scenarios.map(({ name }) => name);
  }

  createAdversariesModel(): AdversaryLevelId[] {
    return this._options.adversaries.reduce<AdversaryLevelId[]>(
      (adversaries, adversary) => {
        adversary.levels.forEach((level) => {
          adversaries.push(level.id);
        });
        return adversaries;
      },
      []
    );
  }
}

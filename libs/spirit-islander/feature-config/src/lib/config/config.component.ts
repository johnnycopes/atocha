/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent, CheckboxTreeComponent } from '@atocha/core/ui';
import {
  CardComponent,
  CardGroupComponent,
  DifficultyEmblemComponent,
  ExpansionEmblemComponent,
  PageComponent,
} from '@atocha/spirit-islander/ui';
import {
  AdversaryLevelId,
  AdversaryName,
  BalancedBoardName,
  Combo,
  Config,
  ExpansionName,
  getValidCombos,
  MapName,
  ScenarioName,
  SpiritName,
} from '@atocha/spirit-islander/util';
import { transformArrToObj, transformObjToArr } from './create-model';
import {
  ConfigTree,
  createAdversariesTree,
  createBoardsTree,
  createExpansionsTree,
  createMapsTree,
  createScenariosTree,
  createSpiritsTree,
} from './create-tree';

export interface ConfigDetails {
  config: Config;
  validCombos: Combo[];
}

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    ButtonComponent,
    CardComponent,
    CardGroupComponent,
    CheckboxTreeComponent,
    CommonModule,
    DifficultyEmblemComponent,
    ExpansionEmblemComponent,
    FormsModule,
    PageComponent,
  ],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ConfigComponent {
  @Input()
  set config(config) {
    this._config = config;

    if (config) {
      this.spiritsTree = createSpiritsTree(config?.expansions);
      this.mapsTree = createMapsTree(config?.expansions);
      this.boardsTree = createBoardsTree(config?.expansions);
      this.scenariosTree = createScenariosTree(config?.expansions);
      this.adversariesTree = createAdversariesTree(config?.expansions);

      this.expansionsModel = transformArrToObj(
        this.expansionsTree,
        config?.expansions
      );
      this.spiritsModel = transformArrToObj(
        this.spiritsTree,
        config?.spiritNames
      );
      this.mapsModel = transformArrToObj(this.mapsTree, config?.mapNames);
      this.boardsModel = transformArrToObj(this.boardsTree, config?.boardNames);
      this.scenariosModel = transformArrToObj(
        this.scenariosTree,
        config?.scenarioNames
      );
      this.adversariesModel = transformArrToObj(
        this.adversariesTree,
        config?.adversaryNamesAndIds
      );
    }
  }
  get config() {
    return this._config;
  }
  private _config: Config | undefined;

  @Output() generate = new EventEmitter<ConfigDetails>();

  getId = <T>({ id }: ConfigTree<T>) => id;
  getChildren = <T>({ children }: ConfigTree<T>) => children ?? [];

  expansionsTree = createExpansionsTree();
  expansionsModel = transformArrToObj(this.expansionsTree, []);

  spiritsTree = createSpiritsTree([]);
  spiritsModel = transformArrToObj(this.spiritsTree, []);

  mapsTree = createMapsTree([]);
  mapsModel = transformArrToObj(this.mapsTree, []);

  boardsTree = createBoardsTree([]);
  boardsModel = transformArrToObj(this.boardsTree, []);

  scenariosTree = createScenariosTree([]);
  scenariosModel = transformArrToObj(this.scenariosTree, []);

  adversariesTree = createAdversariesTree([]);
  adversariesModel = transformArrToObj(this.adversariesTree, []);

  onGenerate(): void {
    if (!this.config) {
      return;
    }
    const config = {
      ...this.config,
      expansions: transformObjToArr(
        this.expansionsTree,
        this.expansionsModel
      ) as ExpansionName[],
      spiritNames: transformObjToArr(
        this.spiritsTree,
        this.spiritsModel
      ) as SpiritName[],
      mapNames: transformObjToArr(this.mapsTree, this.mapsModel) as MapName[],
      boardNames: transformObjToArr(
        this.boardsTree,
        this.boardsModel
      ) as BalancedBoardName[],
      scenarioNames: transformObjToArr(
        this.scenariosTree,
        this.scenariosModel
      ) as ScenarioName[],
      adversaryNamesAndIds: transformObjToArr(
        this.adversariesTree,
        this.adversariesModel
      ) as (AdversaryName | AdversaryLevelId)[],
    };
    const validCombos = getValidCombos(config);

    this.generate.emit({
      config,
      validCombos,
    });
  }
}

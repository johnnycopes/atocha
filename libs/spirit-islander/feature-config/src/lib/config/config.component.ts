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
import {
  ConfigTree,
  createAdversariesTree,
  createBoardsTree,
  createExpansionsTree,
  createMapsTree,
  createScenariosTree,
  createSpiritsTree,
} from './create-tree';
import { ModelTransformer } from './model-transformer';

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

      this.spiritsTransformer.update(this.spiritsTree);
      this.mapsTransformer.update(this.mapsTree);
      this.boardsTransformer.update(this.boardsTree);
      this.scenariosTransformer.update(this.scenariosTree);
      this.adversariesTransformer.update(this.adversariesTree);

      this.expansionsModel = this.expansionsTransformer.toObj(
        config?.expansions
      );
      this.spiritsModel = this.spiritsTransformer.toObj(config?.spiritNames);
      this.mapsModel = this.mapsTransformer.toObj(config?.mapNames);
      this.boardsModel = this.boardsTransformer.toObj(config?.boardNames);
      this.scenariosModel = this.scenariosTransformer.toObj(
        config?.scenarioNames
      );
      this.adversariesModel = this.adversariesTransformer.toObj(
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
  expansionsTransformer = new ModelTransformer(this.expansionsTree);
  expansionsModel = this.expansionsTransformer.toObj([]);

  spiritsTree = createSpiritsTree([]);
  spiritsTransformer = new ModelTransformer(this.spiritsTree);
  spiritsModel = this.spiritsTransformer.toObj([]);

  mapsTree = createMapsTree([]);
  mapsTransformer = new ModelTransformer(this.mapsTree);
  mapsModel = this.mapsTransformer.toObj([]);

  boardsTree = createBoardsTree([]);
  boardsTransformer = new ModelTransformer(this.boardsTree);
  boardsModel = this.boardsTransformer.toObj([]);

  scenariosTree = createScenariosTree([]);
  scenariosTransformer = new ModelTransformer(this.scenariosTree);
  scenariosModel = this.scenariosTransformer.toObj([]);

  adversariesTree = createAdversariesTree([]);
  adversariesTransformer = new ModelTransformer(this.adversariesTree);
  adversariesModel = this.adversariesTransformer.toObj([]);

  onGenerate(): void {
    if (!this.config) {
      return;
    }
    const config = {
      ...this.config,
      expansions: this.expansionsTransformer.toArr(
        this.expansionsModel
      ) as ExpansionName[],
      spiritNames: this.spiritsTransformer.toArr(
        this.spiritsModel
      ) as SpiritName[],
      mapNames: this.mapsTransformer.toArr(this.mapsModel) as MapName[],
      boardNames: this.boardsTransformer.toArr(
        this.boardsModel
      ) as BalancedBoardName[],
      scenarioNames: this.scenariosTransformer.toArr(
        this.scenariosModel
      ) as ScenarioName[],
      adversaryNamesAndIds: this.adversariesTransformer.toArr(
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

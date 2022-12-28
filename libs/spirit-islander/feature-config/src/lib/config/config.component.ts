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

import {
  ButtonComponent,
  CheckboxState,
  CheckboxTreeComponent,
} from '@atocha/core/ui';
import {
  CardComponent,
  CardGroupComponent,
  CheckboxesGroupComponent,
  DifficultyEmblemComponent,
  ExpansionEmblemComponent,
  PageComponent,
} from '@atocha/spirit-islander/ui';
import { Combo, Config } from '@atocha/spirit-islander/util';
import { createTreeModel } from './create-model';
import {
  ConfigTree,
  createAdversariesTree,
  createBoardsTree,
  createExpansionsTree,
  createMapsTree,
  createScenariosTree,
  createSpiritsTree,
} from './create-tree';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    ButtonComponent,
    CardComponent,
    CardGroupComponent,
    CheckboxesGroupComponent,
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

      this.expansionsModel = createTreeModel(
        this.expansionsTree,
        config?.expansions
      );
      this.spiritsModel = createTreeModel(
        this.spiritsTree,
        config?.spiritNames
      );
      this.mapsModel = createTreeModel(this.mapsTree, config?.mapNames);
      this.boardsModel = createTreeModel(this.boardsTree, config?.boardNames);
      this.scenariosModel = createTreeModel(
        this.scenariosTree,
        config?.scenarioNames
      );
      this.adversariesModel = createTreeModel(
        this.adversariesTree,
        config?.adversaryNamesAndIds
      );
    }
  }
  get config() {
    return this._config;
  }
  private _config: Config | undefined;

  @Output() generate = new EventEmitter<{
    config: Config;
    validCombos: Combo[];
  }>();

  getId = <T>({ id }: ConfigTree<T>) => id;
  getChildren = <T>({ children }: ConfigTree<T>) => children ?? [];

  expansionsTree = createExpansionsTree();
  expansionsModel = createTreeModel(this.expansionsTree, []);

  spiritsTree = createSpiritsTree([]);
  spiritsModel = createTreeModel(this.spiritsTree, []);

  mapsTree = createMapsTree([]);
  mapsModel = createTreeModel(this.mapsTree, []);

  boardsTree = createBoardsTree([]);
  boardsModel = createTreeModel(this.boardsTree, []);

  scenariosTree = createScenariosTree([]);
  scenariosModel = createTreeModel(this.scenariosTree, []);

  adversariesTree = createAdversariesTree([]);
  adversariesModel = createTreeModel(this.adversariesTree, []);

  onGenerate(): void {
    this.generate.emit({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config: this.config!,
      validCombos: [],
    });
  }

  onModelChange(e: unknown) {
    console.log(e);
  }
}

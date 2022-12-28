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
  CheckboxesGroupComponent,
  DifficultyEmblemComponent,
  ExpansionEmblemComponent,
  PageComponent,
} from '@atocha/spirit-islander/ui';
import { Combo, Config } from '@atocha/spirit-islander/util';
import { createModel } from './create-model';
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

      this.expansionsModel = createModel(
        this.expansionsTree,
        config?.expansions
      );
      this.spiritsModel = createModel(this.spiritsTree, config?.spiritNames);
      this.mapsModel = createModel(this.mapsTree, config?.mapNames);
      this.boardsModel = createModel(this.boardsTree, config?.boardNames);
      this.scenariosModel = createModel(
        this.scenariosTree,
        config?.scenarioNames
      );
      this.adversariesModel = createModel(
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
  expansionsModel = createModel(this.expansionsTree, []);

  spiritsTree = createSpiritsTree([]);
  spiritsModel = createModel(this.spiritsTree, []);

  mapsTree = createMapsTree([]);
  mapsModel = createModel(this.mapsTree, []);

  boardsTree = createBoardsTree([]);
  boardsModel = createModel(this.boardsTree, []);

  scenariosTree = createScenariosTree([]);
  scenariosModel = createModel(this.scenariosTree, []);

  adversariesTree = createAdversariesTree([]);
  adversariesModel = createModel(this.adversariesTree, []);

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

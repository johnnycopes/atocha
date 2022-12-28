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
import { Combo, Config } from '@atocha/spirit-islander/util';
import { transformArrToObj } from './create-model';
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

  @Output() generate = new EventEmitter<{
    config: Config;
    validCombos: Combo[];
  }>();

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
    this.generate.emit({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config: this.config!,
      validCombos: [],
    });
  }
}

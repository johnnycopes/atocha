/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

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
    ReactiveFormsModule,
  ],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ConfigComponent implements OnInit {
  @Input()
  set config(config) {
    this._config = config;
    const expansions = config?.expansions;

    if (config && expansions) {
      this.spiritsTree = createSpiritsTree(expansions);
      this.mapsTree = createMapsTree(expansions);
      this.boardsTree = createBoardsTree(expansions);
      this.scenariosTree = createScenariosTree(expansions);
      this.adversariesTree = createAdversariesTree(expansions);

      this.spiritsTransformer.update(this.spiritsTree);
      this.mapsTransformer.update(this.mapsTree);
      this.boardsTransformer.update(this.boardsTree);
      this.scenariosTransformer.update(this.scenariosTree);
      this.adversariesTransformer.update(this.adversariesTree);

      this.form.setValue({
        expansions: this.expansionsTransformer.toObj(expansions),
        spirits: this.spiritsTransformer.toObj(config.spiritNames),
        maps: this.mapsTransformer.toObj(config.mapNames),
        boards: this.boardsTransformer.toObj(config.boardNames),
        scenarios: this.scenariosTransformer.toObj(config.scenarioNames),
        adversaries: this.adversariesTransformer.toObj(
          config.adversaryNamesAndIds
        ),
      });
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

  spiritsTree = createSpiritsTree([]);
  spiritsTransformer = new ModelTransformer(this.spiritsTree);

  mapsTree = createMapsTree([]);
  mapsTransformer = new ModelTransformer(this.mapsTree);

  boardsTree = createBoardsTree([]);
  boardsTransformer = new ModelTransformer(this.boardsTree);

  scenariosTree = createScenariosTree([]);
  scenariosTransformer = new ModelTransformer(this.scenariosTree);

  adversariesTree = createAdversariesTree([]);
  adversariesTransformer = new ModelTransformer(this.adversariesTree);

  form = new FormGroup({
    expansions: new FormControl(this.expansionsTransformer.toObj([]), {
      nonNullable: true,
    }),
    spirits: new FormControl(this.spiritsTransformer.toObj([]), {
      nonNullable: true,
    }),
    maps: new FormControl(this.mapsTransformer.toObj([]), {
      nonNullable: true,
    }),
    boards: new FormControl(this.boardsTransformer.toObj([]), {
      nonNullable: true,
    }),
    scenarios: new FormControl(this.scenariosTransformer.toObj([]), {
      nonNullable: true,
    }),
    adversaries: new FormControl(this.adversariesTransformer.toObj([]), {
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    this.form.get('expansions')?.valueChanges.subscribe((expansions) => {
      const expansionsArr = this.expansionsTransformer.toArr(
        expansions
      ) as ExpansionName[];

      this.spiritsTree = createSpiritsTree(expansionsArr);
      this.mapsTree = createMapsTree(expansionsArr);
      this.boardsTree = createBoardsTree(expansionsArr);
      this.scenariosTree = createScenariosTree(expansionsArr);
      this.adversariesTree = createAdversariesTree(expansionsArr);

      this.spiritsTransformer.update(this.spiritsTree);
      this.mapsTransformer.update(this.mapsTree);
      this.boardsTransformer.update(this.boardsTree);
      this.scenariosTransformer.update(this.scenariosTree);
      this.adversariesTransformer.update(this.adversariesTree);

      // Need to call updateModels here
    });
  }

  onGenerate(): void {
    if (!this.config) {
      return;
    }

    const { expansions, spirits, maps, boards, scenarios, adversaries } =
      this.form.getRawValue();
    const config = {
      ...this.config,
      expansions: this.expansionsTransformer.toArr(
        expansions
      ) as ExpansionName[],
      spiritNames: this.spiritsTransformer.toArr(spirits) as SpiritName[],
      mapNames: this.mapsTransformer.toArr(maps) as MapName[],
      boardNames: this.boardsTransformer.toArr(boards) as BalancedBoardName[],
      scenarioNames: this.scenariosTransformer.toArr(
        scenarios
      ) as ScenarioName[],
      adversaryNamesAndIds: this.adversariesTransformer.toArr(adversaries) as (
        | AdversaryName
        | AdversaryLevelId
      )[],
    };
    const validCombos = getValidCombos(config);
    console.log(config);

    this.generate.emit({
      config,
      validCombos,
    });
  }
}

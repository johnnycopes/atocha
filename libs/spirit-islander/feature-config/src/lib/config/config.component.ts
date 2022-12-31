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

import {
  ButtonComponent,
  CheckboxTreeComponent,
  CheckboxTreeNewComponent,
} from '@atocha/core/ui';
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
    CheckboxTreeNewComponent,
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

      this.form.setValue({
        expansions,
        spirits: config.spiritNames,
        maps: config.mapNames,
        boards: config.boardNames,
        scenarios: config.scenarioNames,
        adversaries: config.adversaryNamesAndIds,
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
  spiritsTree = createSpiritsTree([]);
  mapsTree = createMapsTree([]);
  boardsTree = createBoardsTree([]);
  scenariosTree = createScenariosTree([]);
  adversariesTree = createAdversariesTree([]);

  form = new FormGroup({
    expansions: new FormControl<string[]>([], { nonNullable: true }),
    spirits: new FormControl<string[]>([], { nonNullable: true }),
    maps: new FormControl<string[]>([], { nonNullable: true }),
    boards: new FormControl<string[]>([], { nonNullable: true }),
    scenarios: new FormControl<string[]>([], { nonNullable: true }),
    adversaries: new FormControl<string[]>([], { nonNullable: true }),
  });

  ngOnInit(): void {
    this.form.get('expansions')?.valueChanges.subscribe((expansions) => {
      const expansionsArr = expansions as ExpansionName[];

      this.spiritsTree = createSpiritsTree(expansionsArr);
      this.mapsTree = createMapsTree(expansionsArr);
      this.boardsTree = createBoardsTree(expansionsArr);
      this.scenariosTree = createScenariosTree(expansionsArr);
      this.adversariesTree = createAdversariesTree(expansionsArr);
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
      expansions: expansions as ExpansionName[],
      spiritNames: spirits as SpiritName[],
      mapNames: maps as MapName[],
      boardNames: boards as BalancedBoardName[],
      scenarioNames: scenarios as ScenarioName[],
      adversaryNamesAndIds: adversaries as (AdversaryName | AdversaryLevelId)[],
    };
    const validCombos = getValidCombos(config);
    console.log(config);

    this.generate.emit({
      config,
      validCombos,
    });
  }
}

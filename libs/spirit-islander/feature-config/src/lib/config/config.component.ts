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
import { Subject, withLatestFrom } from 'rxjs';

import {
  ButtonComponent,
  CheckboxComponent,
  CheckboxTreeComponent,
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
  createAdversariesModel,
  createBoardsModel,
  createMapsModel,
  createScenariosModel,
  createSpiritsModel,
  ExpansionName,
  getValidCombos,
  MapName,
  ScenarioName,
  SpiritName,
  updateModel,
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
    CheckboxComponent,
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

    if (config) {
      this._updateTrees(config.expansions);
      this.form.setValue({
        expansions: config.expansions,
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
  targetSubject = new Subject<'Expansions' | ExpansionName>();

  ngOnInit(): void {
    this.form
      .get('expansions')
      ?.valueChanges.pipe(withLatestFrom(this.targetSubject.asObservable()))
      .subscribe(([expansions, target]) => {
        const expansionNames = expansions as ExpansionName[];
        const {
          spiritNames,
          mapNames,
          boardNames,
          scenarioNames,
          adversaryNamesAndIds,
        } = this._getFormModels();

        this._updateTrees(expansionNames);
        this.form.patchValue({
          spirits: updateModel(
            createSpiritsModel,
            spiritNames,
            expansionNames,
            target
          ),
          boards: updateModel(
            createBoardsModel,
            boardNames,
            expansionNames,
            target
          ),
          maps: updateModel(createMapsModel, mapNames, expansionNames, target),
          scenarios: updateModel(
            createScenariosModel,
            scenarioNames,
            expansionNames,
            target
          ),
          adversaries: updateModel(
            createAdversariesModel,
            adversaryNamesAndIds,
            expansionNames,
            target
          ),
        });
      });
  }

  onExpansionChange(id: string): void {
    this.targetSubject.next(id as 'Expansions' | ExpansionName);
  }

  onGenerate(): void {
    if (!this.config) {
      return;
    }
    const config = this._getFormModels();
    const validCombos = getValidCombos(config);

    this.generate.emit({
      config,
      validCombos,
    });
  }

  private _updateTrees(expansions: ExpansionName[]): void {
    this.spiritsTree = createSpiritsTree(expansions);
    this.mapsTree = createMapsTree(expansions);
    this.boardsTree = createBoardsTree(expansions);
    this.scenariosTree = createScenariosTree(expansions);
    this.adversariesTree = createAdversariesTree(expansions);
  }

  private _getFormModels(): Config {
    const { expansions, spirits, maps, boards, scenarios, adversaries } =
      this.form.getRawValue();

    return {
      players: 6,
      difficultyRange: [0, 8],
      expansions: expansions as ExpansionName[],
      spiritNames: spirits as SpiritName[],
      mapNames: maps as MapName[],
      boardNames: boards as BalancedBoardName[],
      scenarioNames: scenarios as ScenarioName[],
      adversaryNamesAndIds: adversaries as (AdversaryName | AdversaryLevelId)[],
    };
  }
}

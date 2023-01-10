/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of, Subject, Subscription, withLatestFrom } from 'rxjs';

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
  Players,
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
import {
  playersOutnumberTotalBoards,
  playersOutnumberSelectedBoards,
} from './validators';

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
export class ConfigComponent implements OnInit, OnDestroy {
  @Input() config: Config | undefined;
  @Output() generate = new EventEmitter<ConfigDetails>();

  getId = <T>({ id }: ConfigTree<T>) => id;
  getChildren = <T>({ children }: ConfigTree<T>) => children ?? [];

  subscriptions = new Subscription();
  form = new FormGroup(
    {
      expansions: new FormControl<string[]>([], { nonNullable: true }),
      players: new FormControl<number>(0, { nonNullable: true }),
      spirits: new FormControl<string[]>([], { nonNullable: true }),
      maps: new FormControl<string[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      boards: new FormControl<string[]>([], { nonNullable: true }),
      scenarios: new FormControl<string[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      adversaries: new FormControl<string[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    {
      validators: [playersOutnumberTotalBoards, playersOutnumberSelectedBoards],
    }
  );
  expansionsClickSubject = new Subject<'Expansions' | ExpansionName>();
  expansions$ = this.form.get('expansions')?.valueChanges ?? of([]);

  expansionsTree = createExpansionsTree();
  spiritsTree = createSpiritsTree([]);
  mapsTree = createMapsTree([]);
  boardsTree = createBoardsTree([]);
  scenariosTree = createScenariosTree([]);
  adversariesTree = createAdversariesTree([]);
  jaggedEarth = false;

  ngOnInit(): void {
    // Whenever the expansions change at all, update the other fields' data
    this.subscriptions.add(
      this.expansions$.subscribe((expansions) => {
        const expansionNames = expansions as ExpansionName[];

        this.spiritsTree = createSpiritsTree(expansionNames);
        this.mapsTree = createMapsTree(expansionNames);
        this.boardsTree = createBoardsTree(expansionNames);
        this.scenariosTree = createScenariosTree(expansionNames);
        this.adversariesTree = createAdversariesTree(expansionNames);
        this.jaggedEarth = expansionNames.includes('Jagged Earth');
      })
    );

    // Whenever the user changes the expansions, update the other fields' models
    this.subscriptions.add(
      this.expansions$
        .pipe(withLatestFrom(this.expansionsClickSubject.asObservable()))
        .subscribe(([expansions, target]) => {
          const expansionNames = expansions as ExpansionName[];
          const {
            spiritNames,
            mapNames,
            boardNames,
            scenarioNames,
            adversaryNamesAndIds,
          } = this._getFormModels();

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
            maps: updateModel(
              createMapsModel,
              mapNames,
              expansionNames,
              target
            ),
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
        })
    );

    // Push received config data into form once
    if (this.config) {
      this.form.setValue({
        expansions: this.config.expansions,
        players: this.config.players,
        spirits: this.config.spiritNames,
        maps: this.config.mapNames,
        boards: this.config.boardNames,
        scenarios: this.config.scenarioNames,
        adversaries: this.config.adversaryNamesAndIds,
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onExpansionChange(id: string): void {
    this.expansionsClickSubject.next(id as 'Expansions' | ExpansionName);
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

  private _getFormModels(): Config {
    const {
      expansions,
      players,
      spirits,
      maps,
      boards,
      scenarios,
      adversaries,
    } = this.form.getRawValue();

    return {
      players: players as Players,
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

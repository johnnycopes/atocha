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
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  Combo,
  Config,
  createAdversariesModel,
  createBoardsModel,
  createMapsModel,
  createScenariosModel,
  createSpiritsModel,
  ExpansionName,
  getValidCombos,
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
  playersOutnumberSpirits,
  playersOutnumberTotalBoards,
  playersOutnumberSelectedBoards,
  invalidDifficultyRange,
  required,
} from './validators';
import { modelToConfig } from './form-model';

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

  private _fbnn = this._fb.nonNullable;
  form = this._fbnn.group(
    {
      expansions: this._fbnn.control<string[]>([]),
      players: this._fbnn.control<number>(0),
      difficultyRange: this._fbnn.control<number[]>([0, 0]),
      spirits: this._fbnn.control<string[]>([]),
      maps: this._fbnn.control<string[]>([], required),
      boards: this._fbnn.control<string[]>([]),
      scenarios: this._fbnn.control<string[]>([], required),
      adversaries: this._fbnn.control<string[]>([], required),
    },
    {
      validators: [
        playersOutnumberSpirits,
        playersOutnumberTotalBoards,
        playersOutnumberSelectedBoards,
        invalidDifficultyRange,
      ],
    }
  );
  subscriptions = new Subscription();
  expansionsClickSubject = new Subject<'Expansions' | ExpansionName>();
  expansions$ = this.form.get('expansions')?.valueChanges ?? of([]);

  expansionsTree = createExpansionsTree();
  spiritsTree = createSpiritsTree([]);
  mapsTree = createMapsTree([]);
  boardsTree = createBoardsTree([]);
  scenariosTree = createScenariosTree([]);
  adversariesTree = createAdversariesTree([]);
  jaggedEarth = false;

  constructor(private _fb: FormBuilder) {}

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

    // Initialize form with config data
    if (this.config) {
      this.form.setValue({
        expansions: this.config.expansions,
        players: this.config.players,
        difficultyRange: this.config.difficultyRange,
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

  onSubmit(): void {
    const config = this._getFormModels();
    const validCombos = getValidCombos(config);

    this.generate.emit({
      config,
      validCombos,
    });
  }

  private _getFormModels(): Config {
    return modelToConfig(this.form.getRawValue());
  }
}

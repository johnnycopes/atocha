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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

import { ButtonComponent } from '@atocha/core/ui';
import {
  CardComponent,
  CardGroupComponent,
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
  CheckboxTreeComponent,
  createAdversariesTree,
  createBoardsTree,
  createExpansionsTree,
  createMapsTree,
  createScenariosTree,
  createSpiritsTree,
} from '@atocha/spirit-islander/ui';
import { ConfigForm } from './config-form';

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

  form = new ConfigForm({
    expansions: [],
    players: 1,
    difficultyRange: [0, 0],
    spiritNames: [],
    mapNames: [],
    boardNames: [],
    scenarioNames: [],
    adversaryNamesAndIds: [],
  });
  subscriptions = new Subscription();
  expansionsClickSubject = new Subject<'Expansions' | ExpansionName>();

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
      this.form.expansions$.subscribe((expansionNames) => {
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
      this.expansionsClickSubject.asObservable().subscribe((target) => {
        const {
          expansions,
          spiritNames,
          mapNames,
          boardNames,
          scenarioNames,
          adversaryNamesAndIds,
        } = this._getFormModel();

        this.form.patchValue({
          spiritNames: updateModel(
            createSpiritsModel,
            spiritNames,
            expansions,
            target
          ),
          boardNames: updateModel(
            createBoardsModel,
            boardNames,
            expansions,
            target
          ),
          mapNames: updateModel(createMapsModel, mapNames, expansions, target),
          scenarioNames: updateModel(
            createScenariosModel,
            scenarioNames,
            expansions,
            target
          ),
          adversaryNamesAndIds: updateModel(
            createAdversariesModel,
            adversaryNamesAndIds,
            expansions,
            target
          ),
        });
      })
    );

    // Initialize form with config data
    if (this.config) {
      this.form.setValue(this.config);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onExpansionChange(id: string): void {
    this.expansionsClickSubject.next(id as 'Expansions' | ExpansionName);
  }

  onSubmit(): void {
    const config = this._getFormModel();
    const validCombos = getValidCombos(config);

    this.generate.emit({
      config,
      validCombos,
    });
  }

  private _getFormModel(): Config {
    return this.form.getRawValue();
  }
}

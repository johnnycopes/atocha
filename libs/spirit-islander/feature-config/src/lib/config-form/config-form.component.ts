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
import { withLatestFrom, Subject, Subscription } from 'rxjs';

import { ButtonComponent } from '@atocha/core/ui';
import { CardComponent, CardGroupComponent } from '@atocha/spirit-islander/ui';
import { Config, ExpansionName } from '@atocha/spirit-islander/util';
import {
  createAdversariesRoot,
  createBoardsRoot,
  createExpansionsRoot,
  createMapsRoot,
  createScenariosRoot,
  createSpiritsRoot,
} from '../checkbox-tree/create-tree';
import { ConfigForm } from './config-form';
import { CheckboxTreeComponent } from '../checkbox-tree/checkbox-tree.component';
import { SelectDifficultyRangeComponent } from '../select-difficulty-range/select-difficulty-range.component';
import { SelectPlayersComponent } from '../select-players/select-players.component';

@Component({
  selector: 'app-config-form',
  standalone: true,
  imports: [
    ButtonComponent,
    CardComponent,
    CardGroupComponent,
    CheckboxTreeComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDifficultyRangeComponent,
    SelectPlayersComponent,
  ],
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ConfigFormComponent implements OnInit, OnDestroy {
  @Input() config: Config | undefined;
  @Output() generate = new EventEmitter<Config>();

  form = new ConfigForm({
    expansions: [],
    players: 1,
    difficultyRange: [0, 0],
    spiritNames: [],
    mapNames: [],
    boardNames: [],
    scenarioNames: [],
    adversaryLevelIds: [],
  });
  subscriptions = new Subscription();
  expansionsClickSubject = new Subject<'Expansions' | ExpansionName>();

  expansionsRoot = createExpansionsRoot();
  spiritsRoot = createSpiritsRoot([]);
  mapsRoot = createMapsRoot([]);
  boardsRoot = createBoardsRoot([]);
  scenariosRoot = createScenariosRoot([]);
  adversariesRoot = createAdversariesRoot([]);
  jaggedEarth = false;

  ngOnInit(): void {
    // Whenever the user changes the expansions, update the other fields' models and data
    this.subscriptions.add(
      this.form.expansions$
        .pipe(withLatestFrom(this.expansionsClickSubject.asObservable()))
        .subscribe(([expansions, target]) => {
          this.form.updateModels(expansions, target);
          this._updateFormData(expansions);
        })
    );

    // Initialize form with config data
    if (this.config) {
      this.form.setValue(this.config);
      this._updateFormData(this.config.expansions);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onExpansionChange(id: string): void {
    this.expansionsClickSubject.next(id as 'Expansions' | ExpansionName);
  }

  onSubmit(): void {
    const config = this.form.getRawValue();
    this.generate.emit(config);
  }

  private _updateFormData(expansions: ExpansionName[]): void {
    this.spiritsRoot = createSpiritsRoot(expansions);
    this.mapsRoot = createMapsRoot(expansions);
    this.boardsRoot = createBoardsRoot(expansions);
    this.scenariosRoot = createScenariosRoot(expansions);
    this.adversariesRoot = createAdversariesRoot(expansions);
    this.jaggedEarth = expansions.includes('Jagged Earth');
  }
}

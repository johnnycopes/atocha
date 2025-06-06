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
import { first, withLatestFrom, Subject, Subscription } from 'rxjs';

import { ButtonComponent } from '@atocha/core/ui';
import {
  CardComponent,
  CardGroupComponent,
} from '@atocha/spirit-islander/shared/ui';
import { StateService } from '@atocha/spirit-islander/shared/data-access';
import { Expansion } from '@atocha/spirit-islander/shared/util';
import { Config } from '@atocha/spirit-islander/config/util';
import { CheckboxTreeComponent } from '../checkbox-tree/checkbox-tree.component';
import { SelectDifficultyRangeComponent } from '../select-difficulty-range/select-difficulty-range.component';
import { SelectPlayersComponent } from '../select-players/select-players.component';
import { ConfigForm } from './config-form';
import { Root } from './root';

@Component({
  selector: 'app-config-form',
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

  form!: ConfigForm;
  subscriptions = new Subscription();
  expansionsClickSubject = new Subject<'Expansions' | Expansion>();

  readonly root = new Root();
  jaggedEarth = false;

  constructor(private _stateService: StateService) {
    this._stateService.settings$.pipe(first()).subscribe((settings) => {
      this.form = new ConfigForm(
        {
          expansions: [],
          players: 1,
          difficultyRange: [0, 0],
          spiritNames: [],
          mapNames: [],
          boardNames: [],
          scenarioNames: [],
          adversaryLevelIds: [],
        },
        settings
      );
    });
  }

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
    this.expansionsClickSubject.next(id as 'Expansions' | Expansion);
  }

  onSubmit(): void {
    const config = this.form.getRawValue();
    this.generate.emit(config);
  }

  private _updateFormData(expansions: readonly Expansion[]): void {
    this.root.update(expansions);
    this.jaggedEarth = expansions.includes('Jagged Earth');
  }
}

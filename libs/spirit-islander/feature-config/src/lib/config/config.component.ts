import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppStateService } from '@atocha/spirit-islander/data-access';
import { Config } from '@atocha/spirit-islander/util';
import {
  ConfigDetails,
  ConfigFormComponent,
} from '../config-form/config-form.component';

@Component({
  standalone: true,
  selector: 'app-config',
  imports: [CommonModule, ConfigFormComponent],
  template: `
    <app-config-form
      *ngIf="config"
      [config]="config"
      (generate)="onGenerate($event)"
    ></app-config-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigComponent {
  config: Config = {
    expansions: [],
    players: 2,
    difficultyRange: [0, 8],
    spiritNames: [
      'A Spread of Rampant Green',
      'Bringer of Dreams and Nightmares',
    ],
    mapNames: ['Balanced'],
    boardNames: ['A', 'B', 'C'],
    scenarioNames: ['A Diversity of Spirits', 'Blitz'],
    adversaryLevelIds: ['none', 'bp-0', 'en-4'],
  };

  constructor(private _appStateService: AppStateService) {}

  onGenerate({ config, validCombos }: ConfigDetails): void {
    this._appStateService.generate(config, validCombos);
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { ButtonComponent, PluralPipe, trackBySelf } from '@atocha/core/ui';
import {
  AspectEmblemComponent,
  BoardEmblemComponent,
  CardComponent,
  CardGroupComponent,
  DifficultyEmblemComponent,
  ExpansionEmblemComponent,
  SeparatorComponent,
} from '@atocha/spirit-islander/shared/ui';
import {
  AdversaryName,
  Difficulty,
  getDifficulty,
} from '@atocha/spirit-islander/shared/util';
import { GameSetup } from '@atocha/spirit-islander/game-setup/util';
import { getAdversaryNameById } from './get-adversary-name-by-id';

@Component({
  selector: 'app-game-setup-output',
  imports: [
    AspectEmblemComponent,
    BoardEmblemComponent,
    ButtonComponent,
    CardComponent,
    CardGroupComponent,
    CommonModule,
    DifficultyEmblemComponent,
    ExpansionEmblemComponent,
    PluralPipe,
    SeparatorComponent,
  ],
  templateUrl: './game-setup-output.component.html',
  styleUrls: ['./game-setup-output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GameSetupOutputComponent {
  private _setup: GameSetup | undefined;
  @Input()
  get setup() {
    return this._setup;
  }
  set setup(value) {
    if (!value) {
      return;
    }
    const { map, expansions, scenario, adversaryLevel } = value;
    this._setup = value;
    this.mapDifficulty = getDifficulty(map.difficulty, expansions);
    this.scenarioDifficulty = getDifficulty(scenario.difficulty, expansions);
    this.adversaryName = getAdversaryNameById(adversaryLevel.id);
    this.adversaryDifficulty = getDifficulty(
      adversaryLevel.difficulty,
      expansions
    );
  }

  @Output() edit = new EventEmitter<void>();
  @Output() regenerate = new EventEmitter<void>();

  readonly trackByFn = trackBySelf;
  mapDifficulty: Difficulty = 0;
  scenarioDifficulty: Difficulty = 0;
  adversaryName: AdversaryName = 'No Adversary';
  adversaryDifficulty: Difficulty = 0;
}

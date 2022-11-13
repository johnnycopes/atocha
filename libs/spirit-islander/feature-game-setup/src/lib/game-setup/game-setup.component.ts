import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { PluralPipe } from '@atocha/core/ui';
import {
  BoardEmblemComponent,
  ButtonComponent,
  CardComponent,
  CardGroupComponent,
  DifficultyEmblemComponent,
  ExpansionEmblemComponent,
  PageComponent,
  SeparatorComponent,
} from '@atocha/spirit-islander/ui';
import {
  AdversaryName,
  Difficulty,
  GameSetup,
  getAdversaryById,
  getDifficulty,
} from '@atocha/spirit-islander/util';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [
    BoardEmblemComponent,
    ButtonComponent,
    CardComponent,
    CardGroupComponent,
    CommonModule,
    DifficultyEmblemComponent,
    ExpansionEmblemComponent,
    PageComponent,
    PluralPipe,
    SeparatorComponent,
  ],
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSetupComponent {
  private _setup: GameSetup | undefined;
  @Input()
  get setup() {
    return this._setup;
  }
  set setup(value) {
    if (!value) {
      return;
    }
    this._setup = value;
    this.mapDifficulty = getDifficulty(value.map.difficulty, value.expansions);
    this.scenarioDifficulty = getDifficulty(
      value.scenario.difficulty,
      value.expansions
    );
    this.adversaryName = getAdversaryById(value.adversaryLevel.id);
    this.adversaryDifficulty = getDifficulty(
      value.adversaryLevel.difficulty,
      value.expansions
    );
  }

  @Output() edit = new EventEmitter<void>();
  @Output() regenerate = new EventEmitter<void>();

  mapDifficulty: Difficulty = 0;
  scenarioDifficulty: Difficulty = 0;
  adversaryName: AdversaryName = 'No Adversary';
  adversaryDifficulty: Difficulty = 0;
}

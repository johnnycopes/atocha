import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { ButtonComponent, PluralPipe } from '@atocha/core/ui';
import {
  BoardEmblemComponent,
  ButtonComponent as LegacyButtonComponent,
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
    LegacyButtonComponent,
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
  encapsulation: ViewEncapsulation.None,
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
    const { map, expansions, scenario, adversaryLevel } = value;
    this._setup = value;
    this.mapDifficulty = getDifficulty(map.difficulty, expansions);
    this.scenarioDifficulty = getDifficulty(scenario.difficulty, expansions);
    this.adversaryName = getAdversaryById(adversaryLevel.id);
    this.adversaryDifficulty = getDifficulty(
      adversaryLevel.difficulty,
      expansions
    );
  }

  @Output() edit = new EventEmitter<void>();
  @Output() regenerate = new EventEmitter<void>();

  mapDifficulty: Difficulty = 0;
  scenarioDifficulty: Difficulty = 0;
  adversaryName: AdversaryName = 'No Adversary';
  adversaryDifficulty: Difficulty = 0;
}

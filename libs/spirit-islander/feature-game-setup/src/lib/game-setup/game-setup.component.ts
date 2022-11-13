import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PluralPipe } from '@atocha/core/ui';
import {
  BoardEmblemComponent,
  CardComponent,
  CardGroupComponent,
  DifficultyEmblemComponent,
  ExpansionEmblemComponent,
  PageComponent,
  SeparatorComponent,
} from '@atocha/spirit-islander/ui';
import {
  Difficulty,
  GameSetup,
  getDifficulty,
} from '@atocha/spirit-islander/util';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [
    BoardEmblemComponent,
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
  }

  mapDifficulty: Difficulty = 0;
}

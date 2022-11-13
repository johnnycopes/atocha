import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PluralPipe } from '@atocha/core/ui';
import {
  BoardEmblemComponent,
  CardComponent,
  CardGroupComponent,
  ExpansionEmblemComponent,
  PageComponent,
  SeparatorComponent,
} from '@atocha/spirit-islander/ui';
import { GameSetup } from '@atocha/spirit-islander/util';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [
    BoardEmblemComponent,
    CardComponent,
    CardGroupComponent,
    CommonModule,
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
  @Input() setup: GameSetup | undefined;
}

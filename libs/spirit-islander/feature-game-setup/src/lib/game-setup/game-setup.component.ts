import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CardComponent, PageComponent } from '@atocha/spirit-islander/ui';
import { GameSetup } from '@atocha/spirit-islander/util';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [CardComponent, CommonModule, PageComponent],
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSetupComponent {
  @Input() setup: GameSetup | undefined;
}

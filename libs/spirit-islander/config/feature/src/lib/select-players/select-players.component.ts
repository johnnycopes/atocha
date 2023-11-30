import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { getPlayers } from '@atocha/spirit-islander/shared/util';
import { trackBySelf } from '@atocha/core/ui';

@Component({
  selector: 'app-select-players',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-players.component.html',
  styleUrls: ['./select-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPlayersComponent {
  @Input() form: FormGroup | undefined;

  readonly trackByFn = trackBySelf;
  players = getPlayers();
}

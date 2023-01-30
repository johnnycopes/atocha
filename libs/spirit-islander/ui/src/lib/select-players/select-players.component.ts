import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { trackBySelf } from '@atocha/core/ui';
import { createArray } from '@atocha/core/util';
import { Players } from '@atocha/spirit-islander/util';

@Component({
  selector: 'ui-select-players',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-players.component.html',
  styleUrls: ['./select-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPlayersComponent {
  @Input() form: FormGroup | undefined;

  readonly trackByFn = trackBySelf;
  players = createArray(6) as Players[];
}

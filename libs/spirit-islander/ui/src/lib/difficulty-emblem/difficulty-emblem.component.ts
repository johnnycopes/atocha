import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Difficulty } from '@atocha/spirit-islander/util';
import { EmblemComponent } from '../emblem/emblem.component';

@Component({
  selector: 'ui-difficulty-emblem',
  standalone: true,
  imports: [CommonModule, EmblemComponent],
  templateUrl: './difficulty-emblem.component.html',
  styleUrls: ['./difficulty-emblem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'ui-difficulty-emblem',
  },
})
export class DifficultyEmblemComponent {
  @Input() value: Difficulty = 0;
}

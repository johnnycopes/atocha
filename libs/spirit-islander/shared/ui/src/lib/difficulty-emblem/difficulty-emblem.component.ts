import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Difficulty } from '@atocha/spirit-islander/shared/util';
import { EmblemComponent } from '../emblem/emblem.component';

@Component({
  selector: 'ui-difficulty-emblem',
  imports: [CommonModule, EmblemComponent],
  templateUrl: './difficulty-emblem.component.html',
  styleUrls: ['./difficulty-emblem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifficultyEmblemComponent {
  @Input() value: Difficulty = 0;
}

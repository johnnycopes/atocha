import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SnakeCasePipe } from '@atocha/core/ui';
import { SpiritName } from '@atocha/spirit-islander/shared/util';
import { EmblemComponent } from '../emblem/emblem.component';

@Component({
  selector: 'ui-aspect-emblem',
  standalone: true,
  imports: [CommonModule, EmblemComponent, SnakeCasePipe],
  templateUrl: './aspect-emblem.component.html',
  styleUrls: ['./aspect-emblem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AspectEmblemComponent {
  @Input({ required: true }) name!: SpiritName;
}

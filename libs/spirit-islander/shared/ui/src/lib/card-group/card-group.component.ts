import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnakeCasePipe } from '@atocha/core/ui';

@Component({
  selector: 'ui-card-group',
  imports: [CommonModule, SnakeCasePipe],
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-card-group',
  },
})
export class CardGroupComponent {
  @Input() name = '';
  @Input() description = '';
}

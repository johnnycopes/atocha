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
  standalone: true,
  imports: [CommonModule, SnakeCasePipe],
  templateUrl: './card-group.component.html',
  styleUrls: ['./card-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGroupComponent {
  @Input() name = '';
  @Input() description = '';
}

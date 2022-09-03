import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Leader } from '@atocha/lorenzo/util';

import { CardComponent } from '../card/card.component';
import { CardHeaderComponent } from '../card/card-header.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[ui-leader]',
  standalone: true,
  imports: [CardComponent, CardHeaderComponent, CommonModule],
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderComponent {
  @Input() data: Leader | undefined;
  @Input() canFavorite = false;
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Leader } from '@atocha/lorenzo/util';
import { CardComponent } from '../card/card.component';
import { CardHeaderComponent } from '../card/card-header/card-header.component';

@Component({
  selector: 'ui-leader',
  standalone: true,
  imports: [CardComponent, CardHeaderComponent, CommonModule],
  templateUrl: './leader.component.html',
  styleUrls: ['./leader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderComponent {
  @Input() data: Leader | undefined;
  @Input() favorite = false;
  @Output() favoriteChange = new EventEmitter<boolean>();
}

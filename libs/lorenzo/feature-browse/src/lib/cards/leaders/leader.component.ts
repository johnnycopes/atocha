import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent, CardHeaderComponent } from '@atocha/lorenzo/ui';
import { Leader } from '@atocha/lorenzo/util';

@Component({
    selector: 'app-leader',
    imports: [CardComponent, CardHeaderComponent, CommonModule],
    templateUrl: './leader.component.html',
    styleUrls: ['./leader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderComponent {
  @Input() data: Leader | undefined;
  @Input() favorite = false;
  @Output() favoriteChange = new EventEmitter<boolean>();
}

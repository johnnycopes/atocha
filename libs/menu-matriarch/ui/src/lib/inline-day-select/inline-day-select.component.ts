import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { trackBySelf } from '@atocha/core/ui';
import { Day, getDays } from '@atocha/menu-matriarch/types';

@Component({
  selector: 'ui-inline-day-select',
  templateUrl: './inline-day-select.component.html',
  styleUrls: ['./inline-day-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineDaySelectComponent {
  @Input() startDay: Day = 'Monday';
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Day>();
  public readonly days = getDays();
  public readonly dayTrackByFn = trackBySelf;
}

import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Day } from '@models/day.type';
import { getDays } from '@utility/domain/get-days';
import { trackBySelf } from '@utility/domain/track-by-functions';

@Component({
  selector: 'app-inline-day-select',
  templateUrl: './inline-day-select.component.html',
  styleUrls: ['./inline-day-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineDaySelectComponent {
  @Input() startDay: Day = 'Monday';
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Day>();
  public readonly days = getDays();
  public readonly dayTrackByFn = trackBySelf;
}

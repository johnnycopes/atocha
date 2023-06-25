import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { trackBySelf } from '@atocha/core/ui';
import {
  InlineFormComponent,
  InputComponent,
} from '@atocha/menu-matriarch/shared/ui-generic';
import { Day, getDays } from '@atocha/menu-matriarch/shared/util';

@Component({
  standalone: true,
  selector: 'ui-inline-day-select',
  imports: [CommonModule, FormsModule, InlineFormComponent, InputComponent],
  templateUrl: './inline-day-select.component.html',
  styleUrls: ['./inline-day-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineDaySelectComponent {
  @Input() startDay: Day = 'Monday';
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Day>();
  readonly days = getDays();
  readonly dayTrackByFn = trackBySelf;
}

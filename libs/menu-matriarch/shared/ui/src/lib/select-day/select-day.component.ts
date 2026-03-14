import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { trackBySelf } from '@atocha/core/ui';
import { getDays } from '@atocha/menu-matriarch/shared/util';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'select[ui-select-day]',
  imports: [FormsModule],
  template: `
    @for (day of days; track trackByFn($index, day)) {
    <option [ngValue]="day">
      {{ day }}
    </option>
    }
  `,
})
export class SelectDayComponent {
  readonly days = getDays();
  readonly trackByFn = trackBySelf;
}

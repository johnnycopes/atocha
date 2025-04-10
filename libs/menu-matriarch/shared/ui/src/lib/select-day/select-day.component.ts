import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { trackBySelf } from '@atocha/core/ui';
import { getDays } from '@atocha/menu-matriarch/shared/util';
import { InputComponent } from '../input/input.component';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'select[ui-select-day]',
    imports: [CommonModule, FormsModule, InputComponent],
    template: `
    <option *ngFor="let day of days; trackBy: trackByFn" [ngValue]="day">
      {{ day }}
    </option>
  `
})
export class SelectDayComponent {
  readonly days = getDays();
  readonly trackByFn = trackBySelf;
}

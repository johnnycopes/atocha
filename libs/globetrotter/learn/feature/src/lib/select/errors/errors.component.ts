import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { trackBySelf } from '@atocha/core/ui';

@Component({
  standalone: true,
  selector: 'app-errors',
  imports: [CommonModule],
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorsComponent {
  messages: string[] = [];
  readonly trackyByFn = trackBySelf;

  @Input()
  set errors(errors: ValidationErrors) {
    this.messages = [];

    for (const name in errors) {
      const message = errors[name];
      if (!!message && typeof message === 'string') {
        this.messages.push(message);
      }
    }
  }
}

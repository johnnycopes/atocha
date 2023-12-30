import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { fadeIn } from '../animations';

@Component({
  standalone: true,
  selector: 'ui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn],
})
export class ErrorComponent {
  @Input() header = '';
  @Input() message = '';
}

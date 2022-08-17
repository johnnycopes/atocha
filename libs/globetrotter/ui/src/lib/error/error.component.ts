import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { fadeInAnimation } from '../animations';

@Component({
  standalone: true,
  selector: 'ui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class ErrorComponent {
  @Input() header = '';
  @Input() message = '';
}

import { Component, ChangeDetectionStrategy } from '@angular/core';

import { fadeInAnimation } from '@atocha/globetrotter/ui';

@Component({
  standalone: true,
  selector: 'ui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class ErrorComponent {}

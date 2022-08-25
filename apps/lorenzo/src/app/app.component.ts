import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trackByFactory } from '@atocha/core/ui';

import { Development, DEVELOPMENTS, Leader, LEADERS } from '@atocha/lorenzo/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  text = '';
  readonly leaders = LEADERS;
  readonly developments = DEVELOPMENTS;

  leaderTrackByFn = trackByFactory<Leader>(({ name }) => name);
  developmentTrackByFn = trackByFactory<Development>(({ id }) => id.toString());
}

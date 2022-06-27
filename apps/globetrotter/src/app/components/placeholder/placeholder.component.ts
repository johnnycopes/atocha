import { Component, ChangeDetectionStrategy } from '@angular/core';

import { fadeInAnimation } from '@atocha/ui-globetrotter';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class PlaceholderComponent {

}

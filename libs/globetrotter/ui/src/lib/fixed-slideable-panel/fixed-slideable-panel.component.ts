import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { AnimatedComponent } from '@atocha/core-ui';
import { positionAnimation } from '../animations';

export type FixedSlideablePanelPosition = 'offscreen' | 'header' | 'fullscreen';

@Component({
  selector: 'ui-fixed-slideable-panel',
  templateUrl: './fixed-slideable-panel.component.html',
  styleUrls: ['./fixed-slideable-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [positionAnimation],
})
export class FixedSlideablePanelComponent extends AnimatedComponent {
  @Input() position: FixedSlideablePanelPosition = 'header';
}

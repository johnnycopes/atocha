import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { DURATION } from '@atocha/globetrotter/shared/ui';

export const positionAnimation = trigger('position', [
  state(
    'offscreen',
    style({
      transform: 'translateY(-100%)',
    })
  ),
  state(
    'onscreen',
    style({
      transform: 'translateX(100%)',
    })
  ),
  transition('* => *', animate(`${DURATION.position}ms ease-in-out`)),
]);

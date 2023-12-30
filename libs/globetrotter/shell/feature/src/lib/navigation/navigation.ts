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
    'header',
    style({
      transform: 'translateY(calc(-100% + 64px))', // this value must kept in sync with the header height in SCSS
    })
  ),
  state(
    'fullscreen',
    style({
      transform: 'translateY(0)',
    })
  ),
  state(
    'navigation',
    style({
      transform: 'translateX(100%)',
    })
  ),
  transition('* => *', animate(`${DURATION.position}ms ease-in-out`)),
]);

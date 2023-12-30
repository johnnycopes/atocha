import {
  animation,
  style,
  animate,
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';

import { DURATION } from './duration';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    useAnimation(
      animation([
        style({ opacity: '0' }),
        animate(`${DURATION.fadeIn}ms ease-in`, style({ opacity: '1' })),
      ])
    ),
  ]),
]);

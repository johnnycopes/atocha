import {
  animation,
  style,
  animate,
  trigger,
  transition,
  useAnimation,
} from '@angular/animations';

import { DURATION } from './duration';

const fadeIn = animation([
  style({ opacity: '0' }),
  animate(`{{ timing }}ms {{ delay }}ms ease-in`, style({ opacity: '1' })),
]);

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    useAnimation(fadeIn, {
      params: {
        timing: DURATION.fadeIn,
        delay: 0,
      },
    }),
  ]),
]);

import {
  animation,
  style,
  animate,
  trigger,
  transition,
  useAnimation,
  state,
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

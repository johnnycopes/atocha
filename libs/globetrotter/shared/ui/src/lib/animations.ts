import {
  animation,
  style,
  animate,
  trigger,
  transition,
  useAnimation,
  state,
  query,
  stagger,
  animateChild,
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

export const flipAnimation = trigger('flip', [
  state(
    'front',
    style({
      transform: 'rotateY(0)',
    })
  ),
  state(
    'back',
    style({
      transform: 'rotateY(180deg)',
    })
  ),
  transition('front => back', animate(`${DURATION.cardAnimation}ms ease-in`)),
  transition('back => front', animate(`${DURATION.cardAnimation}ms ease-out`)),
]);

export const disabledAnimation = trigger('disabled', [
  state(
    'disabled',
    style({
      filter: 'grayscale(100%)',
    })
  ),
  transition('* => disabled', animate(`${DURATION.cardAnimation}ms ease-in`)),
]);

export const guessAnimation = trigger('guess', [
  state(
    'none',
    style({
      border: 'none',
      padding: '20px',
    })
  ),
  state(
    'correct',
    style({
      border: '20px solid limegreen',
      padding: '0',
    })
  ),
  state(
    'incorrect',
    style({
      border: '20px solid crimson',
      padding: '0',
    })
  ),
  transition('* => *', animate(`${DURATION.cardAnimation}ms ease-in`)),
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

export const staggerAnimation = trigger('stagger', [
  transition(':enter', [
    query(':enter', stagger(`${DURATION.stagger}ms`, [animateChild()])),
  ]),
]);

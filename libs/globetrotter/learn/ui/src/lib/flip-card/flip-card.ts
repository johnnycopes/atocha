import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { DURATION } from '@atocha/globetrotter/shared/ui';

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
  transition('front => back', animate(`${DURATION.cardFlip}ms ease-in`)),
  transition('back => front', animate(`${DURATION.cardFlip}ms ease-out`)),
]);

export const disabledAnimation = trigger('disabled', [
  state(
    'disabled',
    style({
      filter: 'grayscale(100%)',
    })
  ),
  transition('* => disabled', animate(`${DURATION.cardFlip}ms ease-in`)),
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
  transition('* => *', animate(`${DURATION.cardFlip}ms ease-in`)),
]);

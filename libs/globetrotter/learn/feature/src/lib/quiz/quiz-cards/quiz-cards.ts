import {
  trigger,
  transition,
  query,
  stagger,
  animateChild,
} from '@angular/animations';

import { DURATION } from '@atocha/globetrotter/shared/ui';

export const staggerAnimation = trigger('stagger', [
  transition(':enter', [
    query(':enter', stagger(`${DURATION.cardDeal}ms`, [animateChild()])),
  ]),
]);

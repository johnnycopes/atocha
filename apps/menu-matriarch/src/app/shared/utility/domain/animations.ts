import { animate, animation, state, style, transition, trigger, useAnimation } from '@angular/animations';

const fadeIn = animation([
  style({ opacity: '0' }),
  animate(
    `{{ timing }}ms {{ delay }}ms ease-in`,
    style({ opacity: '1' })
  )
]);

export const fadeInAnimation =
  trigger('fadeIn', [
    transition(':enter', [
      useAnimation(fadeIn, {
        params: {
          timing: 100,
          delay: 0
        }
      })
    ])
  ]);

export const visibilityAnimation =
  trigger('visibility', [
    state('invisible', style({
      opacity: 0
    })),
    state('visible', style({
      opacity: 1
    })),
    transition('* => *', animate(`100ms ease-in-out`))
  ]);

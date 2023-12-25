import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { AnimatedComponent } from '@atocha/core/ui';
import {
  flipAnimation,
  guessAnimation,
  disabledAnimation,
} from '../animations';

export type FlipCardSide = 'front' | 'back';
export type FlipCardGuess = 'correct' | 'incorrect' | 'none';

@Component({
  standalone: true,
  selector: 'ui-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [flipAnimation, guessAnimation, disabledAnimation],
})
export class FlipCardComponent extends AnimatedComponent {
  @Input() side: FlipCardSide = 'front';
  @Input() guess: FlipCardGuess = 'none';
  @Input() canFlip = true;
  @Input() disabled = false;
  @Output() flipped = new EventEmitter<FlipCardSide>();

  onClick(): void {
    if (this.canFlip && !this.disabled) {
      this.flip();
      this.flipped.emit(this.side);
    }
  }

  flip(): void {
    this.side = this.side === 'front' ? 'back' : 'front';
  }
}

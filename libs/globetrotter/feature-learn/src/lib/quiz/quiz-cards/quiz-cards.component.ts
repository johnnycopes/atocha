import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { shuffle } from 'lodash-es';

import { staggerAnimation, fadeInAnimation } from '@atocha/globetrotter/ui';
import { Country, QuizType } from '@atocha/globetrotter/types';

@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation, staggerAnimation],
})
export class QuizCardsComponent {
  @Input() type: QuizType | undefined;
  @Input() currentCountry: Country | undefined;
  @Input()
  set countries(value: Country[]) {
    this.shuffledCountries = shuffle(value);
  }
  shuffledCountries: Country[] = [];
  canFlipCards = true;

  onFlip(cardFlipped: boolean): void {
    this.canFlipCards = !cardFlipped;
  }
}

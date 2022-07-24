import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
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
export class QuizCardsComponent implements OnInit {
  @Input() type: QuizType | undefined;
  @Input() countries: Country[] = [];
  @Input() currentCountry: Country | undefined;
  shuffledCountries: Country[] = [];
  canFlipCards = true;

  ngOnInit(): void {
    this.shuffledCountries = shuffle(this.countries);
  }

  onFlip(cardFlipped: boolean): void {
    this.canFlipCards = !cardFlipped;
  }
}

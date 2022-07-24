import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { shuffle } from 'lodash-es';

import { staggerAnimation, fadeInAnimation } from '@atocha/globetrotter/ui';
import { QuizService } from '@atocha/globetrotter/data-access';
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
  private _countries$ = this._quizService.quiz$.pipe(
    first(),
    map((quiz) => shuffle(quiz?.countries ?? []))
  );
  vm$ = combineLatest([
    this._countries$,
  ]).pipe(
    map(([countries]) => ({
      countries,
    }))
  );
  canFlipCards = true;

  constructor(private _quizService: QuizService) {}

  onFlip(cardFlipped: boolean): void {
    this.canFlipCards = !cardFlipped;
  }
}

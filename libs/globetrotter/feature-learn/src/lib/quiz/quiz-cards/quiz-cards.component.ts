import { Component, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { shuffle } from 'lodash-es';

import { staggerAnimation, fadeInAnimation } from '@atocha/globetrotter-ui';
import { QuizService } from '@atocha/globetrotter/data-access';
import { QuizType } from '@atocha/globetrotter-types';

@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation, staggerAnimation],
})
export class QuizCardsComponent {
  private _quizType$ = this.quizService.quiz.pipe(
    map((quiz) => quiz?.type ?? QuizType.flagsCountries)
  );
  private _countries$ = this.quizService.quiz.pipe(
    first(),
    map((quiz) => shuffle(quiz?.countries ?? []))
  );
  private _currentCountry$ = this.quizService.quiz.pipe(
    map((quiz) => quiz?.countries[0] ?? undefined)
  );
  vm$ = combineLatest([
    this._quizType$,
    this._countries$,
    this._currentCountry$,
  ]).pipe(
    map(([quizType, countries, currentCountry]) => ({
      quizType,
      countries,
      currentCountry,
    }))
  );
  canFlipCards = true;

  constructor(private quizService: QuizService) {}

  onFlip(cardFlipped: boolean): void {
    this.canFlipCards = !cardFlipped;
  }
}

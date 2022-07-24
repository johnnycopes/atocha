import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { shuffle } from 'lodash-es';

import { staggerAnimation, fadeInAnimation } from '@atocha/globetrotter/ui';
import { QuizService } from '@atocha/globetrotter/data-access';
import { QuizType } from '@atocha/globetrotter/types';

@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation, staggerAnimation],
})
export class QuizCardsComponent {
  @Input() type: QuizType | undefined;
  private _countries$ = this._quizService.quiz$.pipe(
    first(),
    map((quiz) => shuffle(quiz?.countries ?? []))
  );
  private _currentCountry$ = this._quizService.quiz$.pipe(
    map((quiz) => quiz?.countries[0] ?? undefined)
  );
  vm$ = combineLatest([
    this._countries$,
    this._currentCountry$,
  ]).pipe(
    map(([countries, currentCountry]) => ({
      countries,
      currentCountry,
    }))
  );
  canFlipCards = true;

  constructor(private _quizService: QuizService) {}

  onFlip(cardFlipped: boolean): void {
    this.canFlipCards = !cardFlipped;
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { shuffle } from 'lodash-es';

import { staggerAnimation, fadeInAnimation } from '@atocha/globetrotter-ui';
import { QuizService } from '@atocha/globetrotter-data-access';
import { Country, QuizType } from '@atocha/globetrotter-types';

interface IViewModel {
  quizType: QuizType;
  countries: Country[];
  currentCountry: Country | undefined;
}

@Component({
  selector: 'app-quiz-cards',
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation, staggerAnimation],
})
export class QuizCardsComponent implements OnInit {
  public canFlipCards = true;
  public vm$: Observable<IViewModel>;
  private _quizType$: Observable<QuizType>;
  private _countries$: Observable<Country[]>;
  private _currentCountry$: Observable<Country | undefined>;

  constructor(private quizService: QuizService) {}

  public ngOnInit(): void {
    this._initializeStreams();
    this.vm$ = combineLatest([
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
  }

  public onFlip(cardFlipped: boolean): void {
    this.canFlipCards = !cardFlipped;
  }

  private _initializeStreams(): void {
    this._quizType$ = this.quizService.quiz.pipe(
      map((quiz) => quiz?.type ?? QuizType.flagsCountries)
    );
    this._countries$ = this.quizService.quiz.pipe(
      first(),
      map((quiz) => shuffle(quiz?.countries ?? []))
    );
    this._currentCountry$ = this.quizService.quiz.pipe(
      map((quiz) => quiz?.countries[0] ?? undefined)
    );
  }
}

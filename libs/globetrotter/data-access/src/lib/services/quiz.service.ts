import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, first, map, shareReplay } from 'rxjs/operators';

import { Quiz } from '@atocha/core/util';
import { Route, Country, Selection } from '@atocha/globetrotter/types';
import { PlaceService } from './place.service';
import { RouterService } from './router.service';
import { shuffle } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly _quizSubject = new BehaviorSubject<
    Quiz<Country> | undefined
  >(undefined);
  quiz$ = this._quizSubject.pipe(
    map((quiz) => quiz?.state),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    private _placeService: PlaceService,
    private _routerService: RouterService
  ) {
    this._routerService.route$
      .pipe(filter((route) => !route.includes(Route.quiz)))
      .subscribe(() => this._quizSubject.next(undefined));
  }

  initializeQuiz({ quantity, places }: Selection): void {
    this._placeService.places$
      .pipe(
        map(({ countriesBySubregion }) => {
          const countries: Country[] = [];

          for (const [name, state] of Object.entries(places)) {
            if (state === 'checked' && countriesBySubregion[name]) {
              countries.push(...countriesBySubregion[name]);
            }
          }

          return shuffle(countries).slice(0, quantity);
        })
      )
      .subscribe((countries) => {
        this._quizSubject.next(new Quiz(countries));
      });
  }

  updateQuiz(correctGuess: boolean): void {
    this._quizSubject.pipe(first()).subscribe((quiz) => {
      if (quiz) {
        quiz.guess(correctGuess);
        this._quizSubject.next(quiz);
      }
    });
  }
}

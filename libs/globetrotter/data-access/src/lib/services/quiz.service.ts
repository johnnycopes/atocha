import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';

import { Quiz, QuizState } from '@atocha/core/util';
import { Route, Country, Selection } from '@atocha/globetrotter/types';
import { PlaceService } from './place.service';
import { RouterService } from './router.service';
import { shuffle } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private _quiz: Quiz<Country> | undefined = undefined;
  private _stateSubject = new BehaviorSubject<
    QuizState<Country> | undefined
  >(undefined);
  quiz$ = this._stateSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    private _placeService: PlaceService,
    private _routerService: RouterService
  ) {
    this._routerService.route$
      .pipe(filter((route) => !route.includes(Route.quiz)))
      .subscribe(() => this._stateSubject.next(undefined));
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
        this._quiz = new Quiz(countries);
        this._stateSubject.next(this._quiz.state);
      });
  }

  updateQuiz(correctGuess: boolean): void {
    if (this._quiz) {
      this._quiz.guess(correctGuess);
      this._stateSubject.next(this._quiz.state);
    }
  }
}

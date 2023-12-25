import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';

import { State } from '@atocha/core/data-access';
import { Country, shuffle } from '@atocha/globetrotter/shared/util';
import {
  PlaceService,
  ROUTES,
  RouterService,
} from '@atocha/globetrotter/shared/data-access';
import { Quiz, QuizState } from './internal/quiz';
import { Selection } from './internal/selection.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly _state = new State<{
    quiz: QuizState<Country> | undefined;
  }>({ quiz: undefined });
  private _quiz: Quiz<Country> | undefined = undefined;

  quiz$ = this._state.getProp('quiz');

  constructor(
    private _placeService: PlaceService,
    private _routerService: RouterService
  ) {
    this._routerService.route$
      .pipe(filter((route) => !route.includes(ROUTES.quiz)))
      .subscribe(() => this._state.updateProp('quiz', undefined));
  }

  initializeQuiz({ quantity, places }: Selection): void {
    this._placeService.places$
      .pipe(
        map(({ countriesBySubregion }) => {
          const countries: Country[] = [];

          for (const place of places) {
            if (countriesBySubregion[place]) {
              countries.push(...countriesBySubregion[place]);
            }
          }

          return shuffle(countries).slice(0, quantity);
        })
      )
      .subscribe((countries) => {
        this._quiz = new Quiz(countries);
        this._state.updateProp('quiz', this._quiz.state);
      });
  }

  updateQuiz(correctGuess: boolean): void {
    if (this._quiz) {
      this._quiz.guess(correctGuess);
      this._state.updateProp('quiz', this._quiz.state);
    }
  }
}

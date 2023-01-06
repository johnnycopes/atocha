import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';

import { Quiz, QuizState, State } from '@atocha/core/util';
import { Route, Country, Selection } from '@atocha/globetrotter/util';
import { PlaceService } from './place.service';
import { RouterService } from './router.service';
import { shuffle } from 'lodash-es';

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
      .pipe(filter((route) => !route.includes(Route.quiz)))
      .subscribe(() => this._state.updateProp('quiz', undefined));
  }

  initializeQuiz({ quantity, model }: Selection): void {
    this._placeService.places$
      .pipe(
        map(({ countriesBySubregion }) => {
          const countries: Country[] = [];

          for (const place of model) {
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

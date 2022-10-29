import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';

import { Quiz, QuizState, State } from '@atocha/core/util';
import { Route, Country, Selection } from '@atocha/globetrotter/util';
import { PlaceService } from './place.service';
import { RouterService } from './router.service';
import { shuffle } from 'lodash-es';

interface QuizServiceState {
  quiz: QuizState<Country> | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private _quiz: Quiz<Country> | undefined = undefined;
  private _state = new State<QuizServiceState>({ quiz: undefined });
  quiz$ = this._state.getProp('quiz');

  constructor(
    private _placeService: PlaceService,
    private _routerService: RouterService
  ) {
    this._routerService.route$
      .pipe(filter((route) => !route.includes(Route.quiz)))
      .subscribe(() => this._state.updateProp('quiz', undefined));
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

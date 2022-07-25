import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, first, map, shareReplay } from 'rxjs/operators';

import { Route, Country, Selection, Quiz } from '@atocha/globetrotter/types';
import { PlaceService } from './place.service';
import { RouterService } from './router.service';
import { shuffle } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly _quizSubject = new BehaviorSubject<Quiz | undefined>(
    undefined
  );
  quiz$ = this._quizSubject.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    private _countryService: PlaceService,
    private _routerService: RouterService
  ) {
    this._routerService.route$
      .pipe(filter((route) => !route.includes(Route.quiz)))
      .subscribe(() => this._quizSubject.next(undefined));
  }

  initializeQuiz({ type, quantity, places }: Selection): void {
    this._countryService.places$
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
        this._quizSubject.next({
          guess: 1,
          correctGuesses: 0,
          type,
          countries,
          totalCountries: countries.length,
          accuracy: 100,
          isComplete: false,
        });
      });
  }

  updateQuiz(correctGuess: boolean): void {
    this._quizSubject
      .pipe(
        first(),
        map((quiz) => {
          if (!quiz) {
            return undefined;
          }

          const updatedQuiz = { ...quiz };
          if (correctGuess) {
            updatedQuiz.countries.shift();
            updatedQuiz.correctGuesses++;
            // End the game if there are no remaining countries left to guess
            if (!updatedQuiz.countries.length) {
              updatedQuiz.accuracy = this._calculateAccuracy(updatedQuiz);
              updatedQuiz.isComplete = true;
            }
          } else {
            updatedQuiz.countries = this._moveGuessedCountryToEnd(
              updatedQuiz.countries
            );
          }

          // Increment the guess counter if the game isn't over, regardless of whether the guess was right or wrong
          if (!updatedQuiz.isComplete) {
            updatedQuiz.guess++;
          }

          return updatedQuiz;
        })
      )
      .subscribe((quiz) => this._quizSubject.next(quiz));
  }

  private _moveGuessedCountryToEnd(countries: Country[]): Country[] {
    const guessedCountry = countries[0];
    const updatedCountries = countries.slice(1);
    updatedCountries.push(guessedCountry);
    return updatedCountries;
  }

  private _calculateAccuracy(quiz: Quiz): number {
    return Math.round((quiz.totalCountries / quiz.guess) * 100);
  }
}

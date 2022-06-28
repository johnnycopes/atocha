import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationEvent } from '@angular/animations';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap, distinctUntilChanged } from 'rxjs/operators';

import { FixedSlideablePanelPosition } from '@atocha/ui-globetrotter';
import { Country, Quiz, QuizType, Route } from '@atocha/types-globetrotter';
import { QuizService } from '@atocha/data-access-globetrotter';

interface IViewModel {
  quiz: Quiz | undefined;
  prompt: string;
  position: FixedSlideablePanelPosition;
}

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizMenuComponent implements OnInit {
  @Output() menuReady = new EventEmitter<true>();
  public vm$: Observable<IViewModel>;
  private _positionSubject$ = new BehaviorSubject<FixedSlideablePanelPosition>(
    'header'
  );
  private _quiz$: Observable<Quiz | undefined>;
  private _position$: Observable<FixedSlideablePanelPosition>;
  private _prompt$: Observable<string>;
  private _promptDict: Record<QuizType, (country: Country) => string> = {
    [QuizType.flagsCountries]: (country) => country.name,
    [QuizType.capitalsCountries]: (country) => country.name,
    [QuizType.countriesCapitals]: (country) => country.capital,
  };

  constructor(private _quizService: QuizService, private _router: Router) {}

  public ngOnInit(): void {
    this._initializeStreams();
    this.vm$ = combineLatest([
      this._quiz$,
      this._position$,
      this._prompt$,
    ]).pipe(
      map(([quiz, position, prompt]) => ({
        quiz,
        position,
        prompt,
      }))
    );
  }

  public async onBack(): Promise<void> {
    await this._router.navigate([Route.learn]);
  }

  public onMenuAnimationFinish(event: AnimationEvent): void {
    if (event.toState === 'header') {
      this.menuReady.emit(true);
    } else if (event.toState === 'offscreen') {
      this._positionSubject$.next('fullscreen');
    }
  }

  private _initializeStreams(): void {
    this._quiz$ = this._quizService.quiz.pipe(
      tap((quiz) => {
        if (quiz?.isComplete) {
          this._positionSubject$.next('offscreen');
        }
      })
    );
    this._prompt$ = this._quizService.quiz.pipe(
      map((quiz) => {
        const currentCountry = quiz?.countries[0];
        return currentCountry
          ? this._promptDict[quiz.type](currentCountry)
          : '';
      })
    );
    this._position$ = this._positionSubject$
      .asObservable()
      .pipe(distinctUntilChanged());
  }
}

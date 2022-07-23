import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationEvent } from '@angular/animations';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { FixedSlideablePanelPosition } from '@atocha/globetrotter/ui';
import { Country, QuizType, Route } from '@atocha/globetrotter/types';
import { QuizService } from '@atocha/globetrotter/data-access';

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizMenuComponent {
  @Input() guess = 1;
  @Input() correctGuesses = 0;
  @Input() totalCountries = 0;
  @Input() accuracy = 0;
  @Input()
  set isComplete(value) {
    if (value) {
      this._positionSubject$.next('offscreen');
    }
    this._isComplete = value;
  }
  get isComplete() { return this._isComplete; }
  private _isComplete = false;

  @Output() menuReady = new EventEmitter<true>();

  private _positionSubject$ = new BehaviorSubject<FixedSlideablePanelPosition>(
    'header'
  );
  private _promptDict: Record<QuizType, (country: Country) => string> = {
    [QuizType.flagsCountries]: (country) => country.name,
    [QuizType.capitalsCountries]: (country) => country.name,
    [QuizType.countriesCapitals]: (country) => country.capital,
  };
  private _prompt$ = this._quizService.quiz$.pipe(
    map((quiz) => {
      const currentCountry = quiz?.countries[0];
      return currentCountry ? this._promptDict[quiz.type](currentCountry) : '';
    })
  );
  private _position$ = this._positionSubject$.pipe(distinctUntilChanged());
  vm$ = combineLatest([this._position$, this._prompt$]).pipe(
    map(([position, prompt]) => ({
      position,
      prompt,
    }))
  );

  constructor(private _quizService: QuizService, private _router: Router) {}

  async onBack(): Promise<void> {
    await this._router.navigate([Route.learn]);
  }

  onMenuAnimationFinish(event: AnimationEvent): void {
    if (event.toState === 'header') {
      this.menuReady.emit(true);
    } else if (event.toState === 'offscreen') {
      this._positionSubject$.next('fullscreen');
    }
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationEvent } from '@angular/animations';

import { FixedSlideablePanelPosition } from '@atocha/globetrotter/ui';
import { Country, QuizType, Route } from '@atocha/globetrotter/types';

@Component({
  selector: 'app-quiz-menu',
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizMenuComponent implements OnChanges {
  private _promptDict: Record<QuizType, (country: Country) => string> = {
    [QuizType.flagsCountries]: (country) => country.name,
    [QuizType.capitalsCountries]: (country) => country.name,
    [QuizType.countriesCapitals]: (country) => country.capital,
  };

  @Input() type: QuizType | undefined;
  @Input() countries: Country[] = [];
  @Input() guess = 1;
  @Input() correctGuesses = 0;
  @Input() totalCountries = 0;
  @Input() accuracy = 0;
  @Input() isComplete = false;

  position: FixedSlideablePanelPosition = 'header';
  prompt = '';

  @Output() menuReady = new EventEmitter<true>();

  constructor(private _router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.type && this.countries.length) {
      const currentCountry = this.countries[0];
      this.prompt = this._promptDict[this.type](currentCountry);
    }

    if (changes['isComplete']?.currentValue) {
      this.position = 'offscreen';
    }
  }

  async onBack(): Promise<void> {
    await this._router.navigate([Route.learn]);
  }

  onMenuAnimationFinish({ toState }: AnimationEvent): void {
    if (toState === 'header') {
      this.menuReady.emit(true);
    } else if (toState === 'offscreen') {
      this.position = 'fullscreen';
    }
  }
}

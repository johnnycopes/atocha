import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { ButtonComponent } from '@atocha/core/ui';
import {
  ContainerComponent,
  FixedSlideablePanelComponent,
  FixedSlideablePanelPosition,
  IconComponent,
} from '@atocha/globetrotter/shared/ui';
import { Country, QuizType } from '@atocha/globetrotter/shared/util';

@Component({
  standalone: true,
  selector: 'app-quiz-menu',
  imports: [
    ButtonComponent,
    CommonModule,
    ContainerComponent,
    FixedSlideablePanelComponent,
    IconComponent,
  ],
  templateUrl: './quiz-menu.component.html',
  styleUrls: ['./quiz-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizMenuComponent implements OnChanges {
  private _promptFns: Record<QuizType, (country: Country) => string> = {
    [QuizType.flagsCountries]: ({ name }) => name,
    [QuizType.capitalsCountries]: ({ name }) => name,
    [QuizType.countriesCapitals]: ({ capital }) => capital,
  };
  @Input() type: QuizType | undefined;
  @Input() guess = 1;
  @Input() correctGuesses = 0;
  @Input() currentCountry: Country | undefined;
  @Input() totalCountries = 0;
  @Input() accuracy = 0;
  @Input() isComplete = false;
  @Output() menuReady = new EventEmitter<true>();
  @Output() exit = new EventEmitter<void>();
  position: FixedSlideablePanelPosition = 'header';
  prompt = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (this.type && this.currentCountry) {
      this.prompt = this._promptFns[this.type](this.currentCountry);
    }

    if (changes['isComplete']?.currentValue) {
      this.position = 'offscreen';
    }
  }

  onMenuAnimationFinish({ toState }: AnimationEvent): void {
    if (toState === 'header') {
      this.menuReady.emit(true);
    } else if (toState === 'offscreen') {
      this.position = 'fullscreen';
    }
  }
}

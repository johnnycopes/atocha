import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import {
  FlipCardComponent,
  FlipCardGuess,
  FlipCardSide,
} from '@atocha/globetrotter/ui';
import { wait } from '@atocha/core/util';
import { Country, Duration, QuizType } from '@atocha/globetrotter/types';

type CardTemplate = Record<FlipCardSide, TemplateRef<unknown> | undefined>;

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizCardComponent implements OnInit {
  @Input() country: Country | undefined;
  @Input() isCurrentCountry = false;
  @Input() canFlip = false;
  @Input() type: QuizType | undefined;
  @Output() flipped = new EventEmitter<boolean>();
  @Output() guessed = new EventEmitter<boolean>();

  @ViewChild('flagTemplate', { static: true })
  flagTemplate: TemplateRef<unknown> | undefined;

  @ViewChild('countryTemplate', { static: true })
  countryTemplate: TemplateRef<unknown> | undefined;

  @ViewChild('capitalTemplate', { static: true })
  capitalTemplate: TemplateRef<unknown> | undefined;

  @ViewChild(FlipCardComponent)
  flipCardComponent: FlipCardComponent | undefined;

  template: CardTemplate | undefined;
  guess: FlipCardGuess = 'none';
  disabled = false;
  private _templates: Record<QuizType, CardTemplate | undefined> = {
    [QuizType.flagsCountries]: undefined,
    [QuizType.countriesCapitals]: undefined,
    [QuizType.capitalsCountries]: undefined,
  };
  private _processingFlip = false;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._setCardTemplates();
  }

  async onAnimationFinish({
    triggerName,
    toState,
  }: AnimationEvent): Promise<void> {
    // onFlip kicks off the chain of events, starting with the flip animation from front to back
    if (triggerName === 'flip') {
      if (toState === 'back') {
        this.guess = this.isCurrentCountry ? 'correct' : 'incorrect';
      } else if (toState === 'front' && this._processingFlip) {
        if (this.isCurrentCountry) {
          this.disabled = true;
        } else {
          await this._updateQuiz();
        }
      }
    }

    // after flip animation is complete, the card is flipped back over and the guess is reset
    else if (triggerName === 'guess') {
      if (toState === 'correct' || toState === 'incorrect') {
        await wait(Duration.cardFlipDisplay);
        this.guess = 'none';
        this.flipCardComponent?.flip();
        this._changeDetectorRef.markForCheck();
      }
    }

    // disabled is only reached after country is correctly guessed
    else if (triggerName === 'disabled' && toState === 'disabled') {
      await this._updateQuiz();
    }
  }

  onFlip(): void {
    this._processingFlip = true;
    this.flipped.emit(true);
  }

  private async _updateQuiz() {
    await wait(Duration.quizUpdateDelay);
    this.guessed.emit(this.isCurrentCountry);
    this.flipped.emit(false);
    this._processingFlip = false;
  }

  private _setCardTemplates(): void {
    this._templates = {
      [QuizType.flagsCountries]: {
        front: this.flagTemplate,
        back: this.countryTemplate,
      },
      [QuizType.capitalsCountries]: {
        front: this.capitalTemplate,
        back: this.countryTemplate,
      },
      [QuizType.countriesCapitals]: {
        front: this.countryTemplate,
        back: this.capitalTemplate,
      },
    };
    if (this.type) {
      this.template = this._templates[this.type];
    }
  }
}

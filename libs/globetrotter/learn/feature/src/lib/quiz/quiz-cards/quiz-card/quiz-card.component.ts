import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
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

import { wait } from '@atocha/core/util';
import { DURATION, FlagComponent } from '@atocha/globetrotter/shared/ui';
import { Country } from '@atocha/globetrotter/shared/util';
import {
  FlipCardComponent,
  FlipCardGuess,
  FlipCardSide,
} from '@atocha/globetrotter/learn/ui';
import { QuizType } from '@atocha/globetrotter/learn/util';

type CardTemplate = Record<FlipCardSide, TemplateRef<unknown> | undefined>;

@Component({
  selector: 'app-quiz-card',
  imports: [CommonModule, FlagComponent, FlipCardComponent],
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

    // After flip animation is complete, the card is flipped back over and the guess is reset
    else if (triggerName === 'guess') {
      if (toState === 'correct' || toState === 'incorrect') {
        await wait(DURATION.cardReverseDisplay);
        this.guess = 'none';
        this.flipCardComponent?.flip();
        this._changeDetectorRef.markForCheck();
      }
    }

    // Disabled is only reached after country is correctly guessed
    else if (triggerName === 'disabled' && toState === 'disabled') {
      await this._updateQuiz();
    }
  }

  onFlip(): void {
    this._processingFlip = true;
    this.flipped.emit(true);
  }

  private async _updateQuiz() {
    await wait(DURATION.quizPromptDelay);
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

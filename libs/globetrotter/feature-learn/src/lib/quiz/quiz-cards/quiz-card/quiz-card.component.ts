/* eslint-disable brace-style */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import {
  FlipCardComponent,
  FlipCardGuess,
  FlipCardSide,
} from '@atocha/globetrotter/ui';
import { wait } from '@atocha/core/util';
import { Country, Duration, QuizType } from '@atocha/globetrotter/types';
import { QuizService } from '@atocha/globetrotter/data-access';

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

  @ViewChild('flagTemplate', { static: true })
  flagTemplate: TemplateRef<unknown> | undefined;

  @ViewChild('countryTemplate', { static: true })
  countryTemplate: TemplateRef<unknown> | undefined;

  @ViewChild('capitalTemplate', { static: true })
  capitalTemplate: TemplateRef<unknown> | undefined;

  @ViewChild(FlipCardComponent)
  flipCardComponent: FlipCardComponent | undefined;

  private _templates: Record<QuizType, CardTemplate | undefined> = {
    [QuizType.flagsCountries]: undefined,
    [QuizType.countriesCapitals]: undefined,
    [QuizType.capitalsCountries]: undefined,
  };
  private _processingFlip = false;
  private _guessChange = new BehaviorSubject<FlipCardGuess>('none');
  private _disabledChange = new BehaviorSubject<boolean>(false);
  private _guess$ = this._guessChange.pipe(distinctUntilChanged());
  private _disabled$ = this._disabledChange.pipe(distinctUntilChanged());
  vm$ = combineLatest([this._guess$, this._disabled$]).pipe(
    map(([guess, disabled]) => ({ guess, disabled }))
  );
  template: CardTemplate | undefined;

  ngOnInit(): void {
    this._setCardTemplates();
  }

  constructor(private _quizService: QuizService) {}

  async onAnimationFinish(event: AnimationEvent): Promise<void> {
    const { triggerName, toState } = event;

    // onFlip kicks off the chain of events, starting with the flip animation from front to back
    if (triggerName === 'flip') {
      if (toState === 'back') {
        this._guessChange.next(this.isCurrentCountry ? 'correct' : 'incorrect');
      } else if (toState === 'front' && this._processingFlip) {
        if (this.isCurrentCountry) {
          this._disabledChange.next(true);
        } else {
          await this._updateQuiz();
        }
      }
    }

    // after flip animation is complete, the card is flipped back over and the guess is reset
    else if (triggerName === 'guess') {
      if (toState === 'correct' || toState === 'incorrect') {
        await wait(Duration.cardFlipDisplay);
        this._guessChange.next('none');
        this.flipCardComponent?.flip();
      }
    }

    // disabled is only reached after guess state to correct
    else if (triggerName === 'disabled' && toState === 'disabled') {
      await this._updateQuiz();
    }
  }

  onFlip(): void {
    this._processingFlip = true;
    this.flipped.emit(true);
  }

  private async _updateQuiz() {
    await wait(Duration.shortDelay);
    this._quizService.updateQuiz(this.isCurrentCountry);
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

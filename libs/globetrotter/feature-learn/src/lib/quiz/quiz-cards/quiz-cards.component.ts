import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { shuffle } from 'lodash-es';

import { trackByFactory } from '@atocha/core/ui';
import { staggerAnimation, fadeInAnimation } from '@atocha/globetrotter/ui';
import { Country, QuizType } from '@atocha/globetrotter/util';
import { QuizCardComponent } from './quiz-card/quiz-card.component';

@Component({
  standalone: true,
  selector: 'app-quiz-cards',
  imports: [CommonModule, QuizCardComponent],
  templateUrl: './quiz-cards.component.html',
  styleUrls: ['./quiz-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation, staggerAnimation],
})
export class QuizCardsComponent implements OnInit {
  @Input() type: QuizType | undefined;
  @Input() countries: readonly Country[] = [];
  @Input() currentCountry: Country | undefined;
  @Output() guessed = new EventEmitter<boolean>();
  shuffledCountries: readonly Country[] = [];
  canFlipCards = true;
  readonly trackByFn = trackByFactory<Country>(({ id }) => id);

  ngOnInit(): void {
    this.shuffledCountries = shuffle(this.countries);
  }
}

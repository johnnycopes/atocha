import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '@atocha/core/ui';
import {
  ContainerComponent,
  FixedSlideablePanelComponent,
  FlipCardComponent,
  IconComponent,
} from '@atocha/globetrotter/ui';
import { QuizComponent } from './quiz.component';
import { QuizCardComponent } from './quiz-cards/quiz-card/quiz-card.component';
import { QuizCardsComponent } from './quiz-cards/quiz-cards.component';
import { QuizMenuComponent } from './quiz-menu/quiz-menu.component';

@NgModule({
  imports: [
    ButtonComponent,
    CommonModule,
    ContainerComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    IconComponent,
  ],
  declarations: [
    QuizComponent,
    QuizCardComponent,
    QuizCardsComponent,
    QuizMenuComponent,
  ],
})
export class QuizModule {}

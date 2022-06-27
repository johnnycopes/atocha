import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiGlobetrotterModule } from '@atocha/ui-globetrotter';
import { QuizComponent } from './quiz.component';
import { QuizCardComponent } from './quiz-cards/quiz-card/quiz-card.component';
import { QuizCardsComponent } from './quiz-cards/quiz-cards.component';
import { QuizMenuComponent } from './quiz-menu/quiz-menu.component';

@NgModule({
  declarations: [
    QuizComponent,
    QuizCardComponent,
    QuizCardsComponent,
    QuizMenuComponent,
  ],
  imports: [CommonModule, UiGlobetrotterModule],
  exports: [
    QuizComponent,
    QuizCardComponent,
    QuizCardsComponent,
    QuizMenuComponent,
  ],
})
export class QuizModule {}

import { NgModule } from '@angular/core';

import { QuizComponent } from './quiz.component';
import { QuizCardComponent } from './quiz-cards/quiz-card/quiz-card.component';
import { QuizCardsComponent } from './quiz-cards/quiz-cards.component';
import { QuizMenuComponent } from './quiz-menu/quiz-menu.component';

@NgModule({
  imports: [
    QuizComponent,
    QuizCardComponent,
    QuizCardsComponent,
    QuizMenuComponent,
  ],
})
export class QuizModule {}

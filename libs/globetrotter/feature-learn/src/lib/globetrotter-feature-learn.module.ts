import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Route } from '@atocha/globetrotter-types';
import { LearnComponent } from './learn.component';

import { QuizModule } from './quiz/quiz.module';
import { QuizComponent } from './quiz/quiz.component';
import { SelectModule } from './select/select.module';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [LearnComponent],
  imports: [
    CommonModule,
    QuizModule,
    SelectModule,
    RouterModule.forChild([
      {
        path: '',
        component: LearnComponent,
        children: [
          { path: Route.select, component: SelectComponent },
          { path: Route.quiz, component: QuizComponent },
          { path: '', redirectTo: Route.select, pathMatch: 'full' },
        ],
      },
    ]),
  ],
})
export class GlobetrotterFeatureLearnModule {}

import { Routes } from '@angular/router';

import { Route } from '@atocha/globetrotter/util';
import { LearnComponent } from './learn.component';
import { SelectComponent } from './select/select.component';
import { QuizComponent } from './quiz/quiz.component';

export const LEARN_ROUTES: Routes = [
  {
    path: '',
    component: LearnComponent,
    children: [
      { path: Route.select, component: SelectComponent },
      { path: Route.quiz, component: QuizComponent },
      { path: '', redirectTo: Route.select, pathMatch: 'full' },
    ],
  },
];

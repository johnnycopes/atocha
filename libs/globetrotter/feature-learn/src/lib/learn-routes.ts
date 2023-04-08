import { Route } from '@angular/router';

import { Route as AppRoute } from '@atocha/globetrotter/util';
import { LearnComponent } from './learn.component';
import { SelectComponent } from './select/select.component';
import { QuizComponent } from './quiz/quiz.component';

export const LEARN_ROUTES: Route[] = [
  {
    path: '',
    component: LearnComponent,
    children: [
      { path: AppRoute.select, component: SelectComponent },
      { path: AppRoute.quiz, component: QuizComponent },
      { path: '', redirectTo: AppRoute.select, pathMatch: 'full' },
    ],
  },
];

import { Routes } from '@angular/router';

import { ROUTES } from '@atocha/globetrotter/shared/data-access';
import { LearnComponent } from './learn.component';
import { SelectComponent } from './select/select.component';
import { QuizComponent } from './quiz/quiz.component';

export const LEARN_ROUTES: Routes = [
  {
    path: '',
    component: LearnComponent,
    children: [
      { path: ROUTES.select, component: SelectComponent },
      { path: ROUTES.quiz, component: QuizComponent },
      { path: '', redirectTo: ROUTES.select, pathMatch: 'full' },
    ],
  },
];

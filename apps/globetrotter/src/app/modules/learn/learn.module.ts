import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Route } from '@atocha/globetrotter-types';
import { LearnComponent } from './learn.component';
import { GlobetrotterFeatureQuizModule, QuizComponent } from '@atocha/globetrotter-feature-quiz';
import { GlobetrotterFeatureSelectModule, SelectComponent } from '@atocha/globetrotter-feature-select';

@NgModule({
  declarations: [LearnComponent],
  imports: [
    CommonModule,
    GlobetrotterFeatureQuizModule,
    GlobetrotterFeatureSelectModule,
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
export class LearnModule {}

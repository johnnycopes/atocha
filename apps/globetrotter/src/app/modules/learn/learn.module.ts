import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { Route } from '@atocha/globetrotter-types';
import { LearnComponent } from './learn.component';
import { GlobetrotterFeatureQuizModule, QuizComponent } from '@atocha/globetrotter-feature-quiz';
import { SelectModule } from './select/select.module';
import { SelectComponent } from './select/select.component';

const learnRoutes: Routes = [
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

@NgModule({
  declarations: [LearnComponent],
  imports: [
    CommonModule,
    GlobetrotterFeatureQuizModule,
    SelectModule,
    RouterModule.forChild(learnRoutes),
  ],
})
export class LearnModule {}

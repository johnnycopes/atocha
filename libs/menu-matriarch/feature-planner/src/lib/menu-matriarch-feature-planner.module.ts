import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlannerComponent } from './planner.component';

@NgModule({
  imports: [
    PlannerComponent,
    RouterModule.forChild([{ path: '', component: PlannerComponent }]),
  ],
})
export class MenuMatriarchFeaturePlannerModule {}

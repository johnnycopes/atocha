import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LEARN_ROUTES } from './learn-routes';

@NgModule({
  imports: [RouterModule.forChild(LEARN_ROUTES)],
})
export class GlobetrotterFeatureLearnModule {}

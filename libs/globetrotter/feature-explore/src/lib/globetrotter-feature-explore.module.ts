import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GlobetrotterUiModule } from '@atocha/globetrotter/ui';
import { ExploreComponent } from './explore.component';
import { ExploreCountryComponent } from './explore-country/explore-country.component';

@NgModule({
  declarations: [ExploreComponent, ExploreCountryComponent],
  imports: [
    GlobetrotterUiModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: ExploreComponent }]),
  ],
})
export class GlobetrotterFeatureExploreModule {}

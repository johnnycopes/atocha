import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MeasurementPipe } from '@atocha/core/ui';
import {
  ListDetailsComponent,
  SmallCapsComponent,
} from '@atocha/globetrotter/ui';
import { ExploreComponent } from './explore.component';
import { ExploreCountryComponent } from './explore-country/explore-country.component';

@NgModule({
  imports: [
    CommonModule,
    ListDetailsComponent,
    MeasurementPipe,
    RouterModule.forChild([{ path: '', component: ExploreComponent }]),
    SmallCapsComponent,
  ],
  declarations: [ExploreComponent, ExploreCountryComponent],
})
export class GlobetrotterFeatureExploreModule {}

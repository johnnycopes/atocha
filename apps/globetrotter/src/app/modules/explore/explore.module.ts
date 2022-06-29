import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GlobetrotterUiModule } from '@atocha/globetrotter-ui';
import { ExploreComponent } from './explore.component';
import { ExploreCountryComponent } from './explore-country/explore-country.component';

const exploreRoutes: Routes = [{ path: '', component: ExploreComponent }];

@NgModule({
  declarations: [ExploreComponent, ExploreCountryComponent],
  imports: [
    GlobetrotterUiModule,
    CommonModule,
    RouterModule.forChild(exploreRoutes),
  ],
})
export class ExploreModule {}

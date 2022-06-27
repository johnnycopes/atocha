import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UiGlobetrotterModule } from '@atocha/ui-globetrotter';
import { ExploreComponent } from './explore.component';
import { ExploreCountryComponent } from './explore-country/explore-country.component';

const exploreRoutes: Routes = [
  { path: '', component: ExploreComponent }
];

@NgModule({
  declarations: [
    ExploreComponent,
    ExploreCountryComponent
  ],
  imports: [
    UiGlobetrotterModule,
    CommonModule,
    RouterModule.forChild(exploreRoutes)
  ]
})
export class ExploreModule { }

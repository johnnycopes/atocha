import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobetrotterUiModule } from '@atocha/globetrotter-ui';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [CommonModule, GlobetrotterUiModule],
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
  ]
})
export class GlobetrotterFeatureShellModule {}

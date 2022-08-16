import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoaderComponent } from '@atocha/globetrotter/ui';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GlobetrotterFeatureExploreModule } from '@atocha/globetrotter/feature-explore';
import { GlobetrotterFeatureLearnModule } from '@atocha/globetrotter/feature-learn';
import { GlobetrotterFeatureShellModule } from '@atocha/globetrotter/feature-shell';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    LoaderComponent,
    HttpClientModule,
    RouterModule,
    GlobetrotterFeatureExploreModule,
    GlobetrotterFeatureLearnModule,
    GlobetrotterFeatureShellModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

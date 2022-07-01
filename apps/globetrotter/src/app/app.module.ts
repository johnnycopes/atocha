import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { GlobetrotterFeatureExploreModule } from '@atocha/globetrotter-feature-explore';
import { GlobetrotterFeatureLearnModule } from '@atocha/globetrotter-feature-learn';
import { GlobetrotterFeatureShellModule } from '@atocha/globetrotter-feature-shell';
import { GlobetrotterUiModule } from '@atocha/globetrotter-ui';

import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ShellComponent } from './components/shell/shell.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    NavigationComponent,
    ShellComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    GlobetrotterFeatureExploreModule,
    GlobetrotterFeatureLearnModule,
    GlobetrotterFeatureShellModule,
    GlobetrotterUiModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

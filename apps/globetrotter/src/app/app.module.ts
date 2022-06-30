import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { GlobetrotterFeatureExploreModule } from '@atocha/globetrotter-feature-explore';
import { GlobetrotterFeatureLearnModule } from '@atocha/globetrotter-feature-learn';
import { GlobetrotterUiModule } from '@atocha/globetrotter-ui';

import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { ShellComponent } from './components/shell/shell.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    NavigationComponent,
    PageNotFoundComponent,
    PlaceholderComponent,
    ShellComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    GlobetrotterFeatureExploreModule,
    GlobetrotterFeatureLearnModule,
    GlobetrotterUiModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

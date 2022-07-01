import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GlobetrotterUiModule } from '@atocha/globetrotter/ui';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  imports: [CommonModule, RouterModule, GlobetrotterUiModule],
  declarations: [
    ErrorComponent,
    HomeComponent,
    NavigationComponent,
    PageNotFoundComponent,
    ShellComponent,
  ],
  exports: [ErrorComponent],
})
export class GlobetrotterFeatureShellModule {}

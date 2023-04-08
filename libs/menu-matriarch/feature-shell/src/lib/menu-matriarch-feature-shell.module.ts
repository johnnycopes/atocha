import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from '@atocha/core/ui';
import { EmptyViewPlaceholderComponent } from '@atocha/menu-matriarch/ui';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShellComponent } from './shell/shell.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  exports: [ErrorComponent],
  imports: [
    ButtonComponent,
    CommonModule,
    EmptyViewPlaceholderComponent,
    ErrorComponent,
    HeaderComponent,
    PageNotFoundComponent,
    RouterModule,
    ShellComponent,
    WelcomeComponent,
  ],
})
export class MenuMatriarchFeatureShellModule {}

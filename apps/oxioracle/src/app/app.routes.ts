import { Routes } from '@angular/router';

import { ShellComponent } from '@atocha/oxioracle/feature-shell';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [],
  },
];


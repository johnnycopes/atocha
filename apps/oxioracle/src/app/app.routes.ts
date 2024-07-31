import { Routes } from '@angular/router';

import { ROUTES } from '@atocha/oxioracle/data-access';
import { ShellComponent } from '@atocha/oxioracle/feature-shell';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: `${ROUTES.table}`,
        title: 'Oxioracle | Table',
        data: { state: ROUTES.table },
        loadComponent: () =>
          import('@atocha/oxioracle/feature-data').then(
            (m) => m.OxioracleFeatureDataComponent
          ),
      },
      {
        path: `${ROUTES.charts}`,
        title: 'Oxioracle | Charts',
        data: { state: ROUTES.charts },
        loadComponent: () =>
          import('@atocha/oxioracle/feature-data').then(
            (m) => m.OxioracleFeatureDataComponent
          ),
      },
    ],
  },
];

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
        title: 'OXIOracle | Table',
        data: { state: ROUTES.table },
        loadComponent: () =>
          import('@atocha/oxioracle/feature-data').then(
            (m) => m.TableComponent
          ),
      },
      {
        path: `${ROUTES.charts}`,
        title: 'OXIOracle | Charts',
        data: { state: ROUTES.charts },
        loadComponent: () =>
          import('@atocha/oxioracle/feature-data').then(
            (m) => m.ChartsComponent
          ),
      },
      {
        path: `${ROUTES.form}`,
        title: 'OXIOracle | Form',
        data: { state: ROUTES.form },
        loadComponent: () =>
          import('@atocha/oxioracle/feature-data').then((m) => m.FormComponent),
      },
    ],
  },
];

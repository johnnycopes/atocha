import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  BrowseComponent,
  FavoritesComponent,
  SettingsComponent,
} from '@atocha/lorenzo/feature-browse';
import { ShellComponent } from '@atocha/lorenzo/feature-shell';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: BrowseComponent,
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

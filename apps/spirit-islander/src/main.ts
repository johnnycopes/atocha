import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';

import { APP_NAME_TOKEN } from '@atocha/core/data-access';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const APP_ROUTES: Route[] = [
  {
    path: 'config',
    title: 'Config | Spirit Islander',
    loadComponent: () =>
      import('@atocha/spirit-islander/feature-config').then(
        (m) => m.ConfigComponent
      ),
  },
  {
    path: 'game-setup',
    title: 'Game Setup | Spirit Islander',
    loadComponent: () =>
      import('@atocha/spirit-islander/feature-game-setup').then(
        (m) => m.GameSetupComponent
      ),
  },
  {
    path: '',
    redirectTo: 'config',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('@atocha/spirit-islander/feature-shell').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_NAME_TOKEN,
      useValue: 'SPIRIT_ISLANDER',
    },
    provideRouter(APP_ROUTES),
  ],
}).catch(console.error);

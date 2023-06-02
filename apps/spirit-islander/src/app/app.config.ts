import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { APP_NAME_TOKEN } from '@atocha/core/data-access';
import { APP_ROUTES } from './app-routes';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_NAME_TOKEN,
      useValue: 'SPIRIT_ISLANDER',
    },
    provideRouter(APP_ROUTES),
    importProvidersFrom([BrowserAnimationsModule]),
  ],
};

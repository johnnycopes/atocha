import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { APP_ROUTES } from './app-routes';
import { CountryService } from '@atocha/globetrotter/shared/data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      APP_ROUTES,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    importProvidersFrom([BrowserAnimationsModule, HttpClientModule]),
    {
      provide: APP_INITIALIZER,
      useFactory: (countryService: CountryService) => () =>
        countryService.initialize(),
      deps: [CountryService],
      multi: true,
    },
  ],
};

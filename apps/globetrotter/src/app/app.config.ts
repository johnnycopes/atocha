import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { APP_NAME_TOKEN } from '@atocha/core/data-access';
import {
  CountryService,
  ErrorService,
  LoaderService,
} from '@atocha/globetrotter/shared/data-access';
import { APP_ROUTES } from './app-routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      APP_ROUTES,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    importProvidersFrom([BrowserAnimationsModule, HttpClientModule]),
    {
      provide: APP_NAME_TOKEN,
      useValue: 'GLOBETROTTER',
    },
    {
      provide: APP_INITIALIZER,
      useFactory:
        (
          countryService: CountryService,
          errorService: ErrorService,
          loaderService: LoaderService
        ) =>
        () => {
          loaderService.setGlobalLoader(true);
          countryService.getCountries().subscribe({
            next: () => loaderService.setGlobalLoader(false),
            error: (error: { message: string }) => {
              errorService.setGlobalError(!!error);
              loaderService.setGlobalLoader(false);
            },
          });
        },
      deps: [CountryService, ErrorService, LoaderService],
      multi: true,
    },
  ],
};

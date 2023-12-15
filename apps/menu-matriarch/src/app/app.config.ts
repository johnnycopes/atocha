import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { APP_NAME_TOKEN } from '@atocha/core/data-access';
import { APP_ROUTES } from './app-routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_NAME_TOKEN,
      useValue: 'MENU_MATRIARCH',
    },
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebaseConfig,
    },
    provideRouter(
      APP_ROUTES,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideFirestore(() => getFirestore()),
      BrowserAnimationsModule,
    ]),
  ],
};

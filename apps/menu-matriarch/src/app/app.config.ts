import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { APP_NAME_TOKEN } from '@atocha/core/data-access';
import { SUPABASE_CONFIG, SupabaseConfig } from '@atocha/supabase/data-access';
import { APP_ROUTES } from './app-routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_NAME_TOKEN,
      useValue: 'MENU_MATRIARCH',
    },
    {
      provide: SUPABASE_CONFIG,
      useValue: environment.supabaseConfig satisfies SupabaseConfig,
    },
    provideRouter(
      APP_ROUTES,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideFirebaseApp(() => initializeApp({ ...environment.firebaseConfig })),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    importProvidersFrom([BrowserAnimationsModule]),
  ],
};

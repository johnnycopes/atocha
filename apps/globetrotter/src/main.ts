import { enableProdMode, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { APP_ROUTES } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      APP_ROUTES,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    importProvidersFrom([BrowserAnimationsModule, HttpClientModule]),
  ],
}).catch(console.error);

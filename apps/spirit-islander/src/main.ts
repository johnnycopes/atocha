import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';

import { APP_NAME_TOKEN } from '@atocha/core/data-access';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig).catch(console.error);

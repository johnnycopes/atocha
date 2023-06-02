import { ApplicationConfig } from '@angular/core';

import { APP_NAME_TOKEN } from '@atocha/core/data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_NAME_TOKEN,
      useValue: 'LORENZO',
    },
  ],
};

import { ApplicationConfig } from '@angular/core';
export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_NAME_TOKEN,
      useValue: 'LORENZO',
    },
  ],
};

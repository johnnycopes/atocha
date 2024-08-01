import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { TodoService } from '@atocha/oxioracle/data-access';
import { Observable } from 'rxjs';
import { Todo } from '@atocha/oxioracle/util';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(APP_ROUTES),
    importProvidersFrom([BrowserAnimationsModule]),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [TodoService],
      multi: true,
    },
  ],
};

function initializeAppFactory(
  todoService: TodoService
): () => Observable<Todo[]> {
  return () => todoService.getTodos();
}

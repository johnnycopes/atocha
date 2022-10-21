import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { APP_NAME_TOKEN } from '@atocha/core/data-access';
import { AppComponent } from './app.component';
import { BrowseComponent } from '@atocha/lorenzo/feature-browse';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowseComponent],
  providers: [
    {
      provide: APP_NAME_TOKEN,
      useValue: 'LORENZO',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
